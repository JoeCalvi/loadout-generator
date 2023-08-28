<script>
import { computed, onMounted, watchEffect } from "vue";
import { AppState } from "../AppState";
import { perksService } from "../services/PerksService";
import { survivorsService } from "../services/SurvivorsService";
import LoadoutBar from "../components/LoadoutBar.vue";

export default {
    data() {
        async function generateRandomLoadout(role) {
            try {
                AppState.loadout = [];
                if (role == "Survivor") {
                    getRandomSurvivor();
                    for (let i = 0; AppState.loadout.length < 4; i++) {
                        const pageMin = 1;
                        const pageMax = 5;
                        const randomPageNumber = Math.floor(Math.random() * (pageMax - pageMin + 1) + pageMin);
                        AppState.pageNumber = randomPageNumber;
                        await perksService.getAllSurvivorPerks();
                        const indexMin = 0;
                        const indexMax = AppState.perks.length - 1;
                        let randomPerkIndex = Math.floor(Math.random() * (indexMax - indexMin + 1) + indexMin);
                        let randomPerk = AppState.perks[randomPerkIndex];
                        if (AppState.loadout.find(p => p.id == randomPerk.id)) {
                            return;
                        }
                        else {
                            AppState.loadout.push(randomPerk);
                        }
                    }
                    console.log("loadout size:", AppState.loadout.length, "loadout:", AppState.loadout);
                }
                if (role == "Killer") {
                    for (let i = 0; AppState.loadout.length < 4; i++) {
                        const pageMin = 1;
                        const pageMax = 4;
                        const randomPageNumber = Math.floor(Math.random() * (pageMax - pageMin + 1) + pageMin);
                        AppState.pageNumber = randomPageNumber;
                        await perksService.getAllKillerPerks();
                        const indexMin = 0;
                        const indexMax = AppState.perks.length - 1;
                        let randomPerkIndex = Math.floor(Math.random() * (indexMax - indexMin + 1) + indexMin);
                        let randomPerk = AppState.perks[randomPerkIndex];
                        if (AppState.loadout.find(p => p.id == randomPerk.id)) {
                            return;
                        }
                        else {
                            AppState.loadout.push(randomPerk);
                        }
                    }
                    console.log("loadout size:", AppState.loadout.length, "loadout:", AppState.loadout);
                }
            }
            catch (error) {
                console.error(error);
            }
        }
        async function getRandomSurvivor() {
            try {
                AppState.activeSurvivor = null;
                await survivorsService.getAllSurvivors();
                const indexMin = 0;
                const indexMax = AppState.survivors.length - 1;
                const randomSurvivorIndex = Math.floor(Math.random() * (indexMax - indexMin + 1) + indexMin);
                AppState.activeSurvivor = AppState.survivors[randomSurvivorIndex];
                console.log("random survivor:", AppState.activeSurvivor.name);
            }
            catch (error) {
                console.error(error);
            }
        }
        onMounted(() => {
            generateRandomLoadout("Survivor");
            getRandomSurvivor();
        });
        watchEffect(() => {
            AppState.activeSurvivor;
        });
        return {
            generateRandomLoadout,
            loadout: computed(() => AppState.loadout),
            activeSurvivor: computed(() => AppState.activeSurvivor)
        };
    },
    components: { LoadoutBar }
}
</script>

<template>
  <div class="container-fluid">
    <div class="row m-auto justify-content-around">
      <div class="col-md-3">
        <div v-if="activeSurvivor" class="row m-auto justify-content-center align-items-center">
          <h4 class="text-center pt-3">Your Survivor</h4>
          <img :src="activeSurvivor.portrait" alt="">
          <h6 class="text-center mb-3">{{ activeSurvivor.name }}</h6>
        </div>
      </div>
      <div class="col-md-8 d-flex flex-column justify-content-center">
        <div class="row d-none d-md-flex justify-content-end mb-3">
          <div class="col-md-3 d-flex justify-content-end gap-3">
            <button @click="generateRandomLoadout('Survivor')" class="btn btn-outline-light">Reroll</button>
            <button class="btn btn-danger">Killer</button>
          </div>
        </div>
        <div class="row d-flex d-md-none justify-content-center mb-3">
          <div class="col-md-3 d-flex justify-content-center gap-3">
            <button @click="generateRandomLoadout('Survivor')" class="btn btn-outline-light">Reroll</button>
            <button class="btn btn-danger">Killer</button>
          </div>
        </div>
        <LoadoutBar :loadout="loadout"/>
      </div>
    </div>
    <div v-if="loadout.length > 0" class="row m-auto">
      <div class="col-12">
        <h4 class="text-center my-2 pt-3">Perk Breakdown</h4>
        <div class="row m-auto py-3 align-items-center">
          <div class="col-12 d-flex align-items-center justify-content-center">
            <div class="row w-100 m-auto py-4 justify-content-between align-items-center border border-white border-opacity-25 border-start-0 border-end-0">
              <div class="col-md-3 my-3 pb-3 d-flex justify-content-center align-items-center">
                <div class="perk-icon-background d-flex justify-content-center align-items-center">
                  <img v-if="loadout[0]" class="perk-icon" :src="loadout[0].icon" :alt="loadout[0].name" :title="loadout[0].name">
                </div>
              </div>
              <div class="col-md-9 mb-3 d-flex flex-column justify-content-center">
                <h5 v-if="loadout[0]" class="mb-0">{{ loadout[0].name }}</h5>
                <p v-if="loadout[0] && loadout[0].survivor"><span class="text-danger">{{ loadout[0].survivor.name }}</span> Perk</p>
                <p v-if="loadout[0] && !loadout[0].survivor">General Survivor Perk</p>
                <i v-if="loadout[0]">{{ loadout[0].description }}</i>
              </div>
            </div>
          </div>
        </div>
        <div class="row m-auto py-3 align-items-center">
          <div class="col-12 d-flex align-items-center justify-content-center">
            <div class="row w-100 m-auto pb-4 justify-content-between align-items-center border-bottom border-white border-opacity-25">
              <div class="col-md-3 my-3 pb-3 d-flex justify-content-center align-items-center">
                <div class="perk-icon-background d-flex justify-content-center align-items-center">
                  <img v-if="loadout[1]" class="perk-icon" :src="loadout[1].icon" :alt="loadout[1].name" :title="loadout[1].name">
                </div>
              </div>
              <div class="col-md-9 mb-3 d-flex flex-column justify-content-center">
                <h5 v-if="loadout[1]" class="mb-0">{{ loadout[1].name }}</h5>
                <p v-if="loadout[1] && loadout[1].survivor"><span class="text-danger">{{ loadout[1].survivor.name }}</span> Perk</p>
                <p v-if="loadout[1] && !loadout[1].survivor">General Survivor Perk</p>
                <i v-if="loadout[1]">{{ loadout[1].description }}</i>
              </div>
            </div>
          </div>
        </div>
        <div class="row m-auto py-3 align-items-center">
          <div class="col-12 d-flex align-items-center justify-content-center">
            <div class="row w-100 m-auto pb-4 justify-content-between align-items-center border-bottom border-white border-opacity-25">
              <div class="col-md-3 my-3 pb-3 d-flex justify-content-center align-items-center">
                <div class="perk-icon-background d-flex justify-content-center align-items-center">
                  <img v-if="loadout[2]" class="perk-icon" :src="loadout[2].icon" :alt="loadout[2].name" :title="loadout[2].name">
                </div>
              </div>
              <div class="col-md-9 mb-3 d-flex flex-column justify-content-center">
                <h5 v-if="loadout[2]" class="mb-0">{{ loadout[2].name }}</h5>
                <p v-if="loadout[2] && loadout[2].survivor"><span class="text-danger">{{ loadout[2].survivor.name }}</span> Perk</p>
                <p v-if="loadout[2] && !loadout[2].survivor">General Survivor Perk</p>
                <i v-if="loadout[2]">{{ loadout[2].description }}</i>
              </div>
            </div>
          </div>
        </div>
        <div class="row m-auto py-3 align-items-center">
          <div class="col-12 d-flex align-items-center justify-content-center">
            <div class="row w-100 m-auto pb-4 justify-content-between align-items-center border-bottom border-white border-opacity-25">
              <div class="col-md-3 my-3 pb-3 d-flex justify-content-center align-items-center">
                <div class="perk-icon-background d-flex justify-content-center align-items-center">
                  <img v-if="loadout[3]" class="perk-icon" :src="loadout[3].icon" :alt="loadout[3].name" :title="loadout[3].name">
                </div>
              </div>
              <div class="col-md-9 mb-3 d-flex flex-column justify-content-center">
                <h5 v-if="loadout[3]" class="mb-0">{{ loadout[3].name }}</h5>
                <p v-if="loadout[3] && loadout[3].survivor"><span class="text-danger">{{ loadout[3].survivor.name }}</span> Perk</p>
                <p v-if="loadout[3] && !loadout[3].survivor">General Survivor Perk</p>
                <i v-if="loadout[3]">{{ loadout[3].description }}</i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>

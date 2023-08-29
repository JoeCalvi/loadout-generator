<script>
import { computed, onMounted, watchEffect } from "vue";
import { AppState } from "../AppState";
import { perksService } from "../services/PerksService";
import { survivorsService } from "../services/SurvivorsService";
import { killersService } from "../services/KillersService";
import LoadoutBar from "../components/LoadoutBar.vue";
import PerkBreakdown from "../components/PerkBreakdown.vue"

export default {
    data() {
        async function generateRandomLoadout(role) {
            try {
                AppState.loadout = [];
                if (role == "Survivor") {
                    await getRandomSurvivor();
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
                    await getRandomKiller();
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

        async function getRandomKiller() {
            try {
              AppState.activeKiller = null;
              await killersService.getAllKillers();
              const indexMin = 0;
              const indexMax = AppState.killers.length - 1;
              const randomKillerIndex = Math.floor(Math.random() * (indexMax - indexMin + 1) + indexMin);
              AppState.activeKiller = AppState.killers[randomKillerIndex];
              console.log("random killer:", AppState.activeKiller.killer_name)
            } catch (error) {
              console.error(error)
            }
        }

        onMounted(() => {
            AppState.survivorPerksOnly = true;
            AppState.killerPerksOnly = false;
            generateRandomLoadout("Survivor");
            getRandomSurvivor();
        });
        watchEffect(() => {
            AppState.activeSurvivor;
            AppState.activeKiller;
            AppState.loadout;
        });
        return {
            generateRandomLoadout,
            loadout: computed(() => AppState.loadout),
            activeSurvivor: computed(() => AppState.activeSurvivor),
            activeKiller: computed(() => AppState.activeKiller),
            survivorOnly: computed(() => AppState.survivorPerksOnly),
            killerOnly: computed(() => AppState.killerPerksOnly),

            survivorRollsOnly () {
              if (AppState.survivorPerksOnly == false) {
                AppState.survivorPerksOnly = true;
                AppState.killerPerksOnly = false;
              } 
            },

            killerRollsOnly () {
              if (AppState.killerPerksOnly == false) {
                AppState.killerPerksOnly = true;
                AppState.survivorPerksOnly = false;
              }
            }
        };
    },
    components: { LoadoutBar, PerkBreakdown }
}
</script>

<template>
  <div class="container-fluid">
    <div class="row m-auto justify-content-around">
      <div class="col-md-3">
        <div v-if="survivorOnly && activeSurvivor" class="row m-auto justify-content-center align-items-center">
          <h4 class="text-center pt-3">Your Survivor</h4>
          <img :src="activeSurvivor.portrait" alt="">
          <h6 class="text-center mb-3">{{ activeSurvivor.name }}</h6>
        </div>
        <div v-if="killerOnly && activeKiller" class="row m-auto justify-content-center align-items-center">
          <h4 class="text-center pt-3">Your Killer</h4>
          <img :src="activeKiller.portrait" alt="">
          <h6 class="text-center mb-3">{{ activeKiller.killer_name }}</h6>
        </div>
      </div>
      <div class="col-md-8 d-flex flex-column justify-content-center">
        <div class="row d-none d-md-flex justify-content-end mb-3">
          <div class="col-md-3 d-flex justify-content-end gap-3">
            <button v-if="survivorOnly" @click="generateRandomLoadout('Survivor')" class="btn btn-outline-light">Reroll</button>
            <button v-if="killerOnly" @click="generateRandomLoadout('Killer')" class="btn btn-outline-light">Reroll</button>
            <button v-if="survivorOnly" @click="killerRollsOnly" class="btn btn-danger">Killer</button>
            <button v-if="killerOnly" @click="survivorRollsOnly" class="btn btn-warning">Survivor</button>
          </div>
        </div>
        <div class="row d-flex d-md-none justify-content-center mb-3">
          <div class="col-md-3 d-flex justify-content-center gap-3">
            <button v-if="survivorOnly" @click="generateRandomLoadout('Survivor')" class="btn btn-outline-light">Reroll</button>
            <button v-if="killerOnly" @click="generateRandomLoadout('Killer')" class="btn btn-outline-light">Reroll</button>
            <button v-if="survivorOnly" @click="killerRollsOnly" class="btn btn-danger">Killer</button>
            <button v-if="killerOnly" @click="survivorRollsOnly" class="btn btn-warning">Survivor</button>
          </div>
        </div>
        <LoadoutBar :loadout="loadout"/>
      </div>
    </div>
    <PerkBreakdown :loadout="loadout"/>
  </div>
</template>

<style scoped>
</style>

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
                            continue;
                        }
                        else {
                            if (randomPerk.associated_status_effects.length > 0) {
                                randomPerk.associated_status_effects.forEach(e => {
                                  const googleDriveURL = e.icon;
                                  const fileId = googleDriveURL.slice(32, 65)
                                  const iconLink = `https://drive.google.com/uc?id=${fileId}`
                                  e.icon = iconLink
                              });
                            }
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
                            continue;
                        }
                        else {
                            if (randomPerk.associated_status_effects.length > 0) {
                                randomPerk.associated_status_effects.forEach(e => {
                                  const googleDriveURL = e.icon;
                                  const fileId = googleDriveURL.slice(32, 65)
                                  const iconLink = `https://drive.google.com/uc?id=${fileId}`
                                  e.icon = iconLink
                              });
                            }
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
                AppState.randomSurvivor = null;
                await survivorsService.getAllSurvivors();
                const indexMin = 0;
                const indexMax = AppState.survivors.length - 1;
                const randomSurvivorIndex = Math.floor(Math.random() * (indexMax - indexMin + 1) + indexMin);
                AppState.randomSurvivor = AppState.survivors[randomSurvivorIndex];
                console.log("random survivor:", AppState.randomSurvivor.name);
            }
            catch (error) {
                console.error(error);
            }
        }

        async function getRandomKiller() {
            try {
              AppState.randomKiller = null;
              await killersService.getAllKillers();
              const indexMin = 0;
              const indexMax = AppState.killers.length - 1;
              const randomKillerIndex = Math.floor(Math.random() * (indexMax - indexMin + 1) + indexMin);
              AppState.randomKiller = AppState.killers[randomKillerIndex];
              console.log("random killer:", AppState.randomKiller.killer_name)
            } catch (error) {
              console.error(error)
            }
        }

        onMounted(() => {
          AppState.survivorPerksOnly = true;
          AppState.killerPerksOnly = false;
          getRandomSurvivor();
          generateRandomLoadout("Survivor");
        });

        watchEffect(() => {
            AppState.randomSurvivor;
            AppState.randomKiller;
            AppState.loadout;
        });
        return {
            generateRandomLoadout,
            loadout: computed(() => AppState.loadout),
            randomSurvivor: computed(() => AppState.randomSurvivor),
            randomKiller: computed(() => AppState.randomKiller),
            survivorOnly: computed(() => AppState.survivorPerksOnly),
            killerOnly: computed(() => AppState.killerPerksOnly),

            async survivorRollsOnly () {
              if (AppState.survivorPerksOnly == false) {
                AppState.survivorPerksOnly = true;
                AppState.killerPerksOnly = false;
                await generateRandomLoadout("Survivor")
              } 
            },

            async killerRollsOnly () {
              if (AppState.killerPerksOnly == false) {
                AppState.killerPerksOnly = true;
                AppState.survivorPerksOnly = false;
                await generateRandomLoadout("Killer");
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
        <div v-if="survivorOnly && randomSurvivor" class="row m-auto justify-content-center align-items-center">
          <h4 class="text-center pt-3">Your Survivor</h4>
          <img :src="randomSurvivor.portrait" alt="">
          <h6 class="text-center mb-3">{{ randomSurvivor.name }}</h6>
        </div>
        <div v-if="killerOnly && randomKiller" class="row m-auto justify-content-center align-items-center">
          <h4 class="text-center pt-3">Your Killer</h4>
          <img :src="randomKiller.portrait" alt="">
          <h6 class="text-center mb-3">{{ randomKiller.killer_name }}</h6>
        </div>
      </div>
      <div class="col-md-8 d-flex flex-column justify-content-center">
        <div class="row d-none d-md-flex justify-content-end my-3">
          <div class="col-md-3 d-flex justify-content-end gap-3">
            <button v-if="survivorOnly" @click="generateRandomLoadout('Survivor')" class="btn btn-outline-light">Reroll</button>
            <button v-if="killerOnly" @click="generateRandomLoadout('Killer')" class="btn btn-outline-light">Reroll</button>
            <button v-if="survivorOnly" @click="killerRollsOnly" class="btn btn-danger">Killer</button>
            <button v-if="killerOnly" @click="survivorRollsOnly" class="btn btn-warning">Survivor</button>
          </div>
        </div>
        <div class="row d-flex d-md-none justify-content-center my-3">
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

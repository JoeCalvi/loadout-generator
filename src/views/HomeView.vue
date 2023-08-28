<script>
import { computed, onMounted, watchEffect } from "vue";
import { AppState } from "../AppState";
import { killersService } from "../services/KillersService";
import { survivorsService } from "../services/SurvivorsService";
import { perksService } from "../services/PerksService";

export default {
  data() {
      async function generateRandomLoadout(role) {
        try {
          AppState.loadout = [];

          if(role == "Survivor") {
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
                return
              } else {
                AppState.loadout.push(randomPerk)
              }
            }
            console.log("loadout size:", AppState.loadout.length, "loadout:", AppState.loadout)
          }

          if(role == "Killer") {
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
                return
              } else {
                AppState.loadout.push(randomPerk)
              }
            }
            console.log("loadout size:", AppState.loadout.length, "loadout:", AppState.loadout)
          }
        } catch (error) {
          console.error(error)
        }
      }

      onMounted(() => {
        AppState.loadout = [];
      })

    return {
      generateRandomLoadout,
      loadout: computed(() => AppState.loadout)
    }
  }
}
</script>

<template>
  <div class="container-fluid">
    <div class="row m-auto justify-content-center">
      <div class="col-md-6 loadout-section d-flex flex-column justify-content-center align-items-center">
        <div class="row m-auto w-100">
          <div class="col-md-6 text-center">
            <button @click="generateRandomLoadout('Survivor')" class="btn btn-outline-warning">Survivor</button>
          </div>
          <div class="col-md-6 text-center">
            <button @click="generateRandomLoadout('Killer')" class="btn btn-outline-danger">Killer</button>
          </div>
        </div>
        <div class="w-100" v-if="loadout.length > 0">
          <div class="row w-100 justify-content-center">
            <div class="col-2 d-flex justify-content-center">
              <div class="perk-icon-background d-flex justify-content-center align-items-center">
                <img v-if="loadout[0]" class="perk-icon" :src="loadout[0].icon" :alt="loadout[0].name" :title="loadout[0].name">
              </div>
            </div>
          </div>
          <div class="row w-100 justify-content-center">
            <div class="col-2 d-flex justify-content-center me-3">
              <div class="perk-icon-background d-flex justify-content-center align-items-center">
                <img v-if="loadout[1]" class="perk-icon" :src="loadout[1].icon" :alt="loadout[1].name" :title="loadout[1].name">
              </div>
            </div>
            <div class="col-2 d-flex justify-content-center ms-3">
              <div class="perk-icon-background d-flex justify-content-center align-items-center">
                <img v-if="loadout[2]" class="perk-icon" :src="loadout[2].icon" :alt="loadout[2].name" :title="loadout[2].name">
              </div>
            </div>
          </div>
          <div class="row w-100 justify-content-center">
            <div class="col-2 d-flex justify-content-center">
              <div class="perk-icon-background d-flex justify-content-center align-items-center">
                <img v-if="loadout[3]" class="perk-icon" :src="loadout[3].icon" :alt="loadout[3].name" :title="loadout[3].name">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loadout-section {
  height: 40vh;
}
</style>

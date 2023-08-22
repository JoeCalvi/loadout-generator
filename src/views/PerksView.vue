<script>
import { computed, onMounted, watchEffect, ref } from "vue";
import { AppState } from "../AppState";
import { perksService } from "../services/PerksService";

export default {
  data() {  
    const editable = ref({ generic: false });

    async function getAllPerks () {
      try {
        await perksService.getAllPerks();
      } catch (error) {
        console.error(error);
      }
    }

    async function getAllSurvivorPerks () {
      try {
        await perksService.getAllSurvivorPerks();
      } catch (error) {
        console.error(error)
      }
    }

    async function getAllKillerPerks () {
      try {
        await perksService.getAllKillerPerks();
      } catch (error) {
        console.error(error)
      }
    }
 
    onMounted(() => {
      getAllPerks()
    })

    watchEffect(() => {
      if (AppState.killerPerksOnly == true) {
        getAllKillerPerks();
      } else if (AppState.survivorPerksOnly == true) {
        getAllSurvivorPerks();
      } else if (AppState.killerPerksOnly == false && AppState.survivorPerksOnly == false) {
        getAllPerks();
      }
    })

    return {
      perks: computed(() => AppState.perks),
      pageNumber: computed(() => AppState.pageNumber),
      survivorPerksOnly: computed(() => AppState.survivorPerksOnly),
      killerPerksOnly: computed(() => AppState.killerPerksOnly),
      editable,
      getAllPerks,
      getAllKillerPerks,
      getAllSurvivorPerks,

      previousPage () {
        if (AppState.survivorPerksOnly == false && AppState.killerPerksOnly == false && editable.value.generic == false) {
          if (AppState.pageNumber == 1) {
            AppState.pageNumber = 9;
          } else if (AppState.pageNumber > 1 ) {
            AppState.pageNumber--;
          }
        } else if (AppState.survivorPerksOnly == true && AppState.killerPerksOnly == false && editable.value.generic == false) {
          if (AppState.pageNumber == 1) {
            AppState.pageNumber = 5;
          } else if (AppState.pageNumber > 1 ) {
            AppState.pageNumber--;
          }
      } else if (AppState.survivorPerksOnly == false && AppState.killerPerksOnly == true && editable.value.generic == false) {
          if (AppState.pageNumber == 1) {
            AppState.pageNumber = 4;
          } else if (AppState.pageNumber > 1 ) {
            AppState.pageNumber--;
          }
      }
      },

      nextPage () {
          if (AppState.survivorPerksOnly == false && AppState.killerPerksOnly == false && editable.value.generic == false) {
            if (AppState.pageNumber == 9) {
              AppState.pageNumber = 1;
            } else if (AppState.pageNumber < 9) {
              AppState.pageNumber++;
            }
          } else if (AppState.survivorPerksOnly == true && AppState.killerPerksOnly == false && editable.value.generic == false) {
            if (AppState.pageNumber == 5) {
              AppState.pageNumber = 1;
            } else if (AppState.pageNumber < 5 ) {
              AppState.pageNumber++;
            }
        } else if (AppState.survivorPerksOnly == false && AppState.killerPerksOnly == true && editable.value.generic == false) {
            if (AppState.pageNumber == 4) {
              AppState.pageNumber = 1;
            } else if (AppState.pageNumber < 4 ) {
              AppState.pageNumber++;
            }
        }
      },

      survivorOnly () {
        AppState.survivorPerksOnly = true;
        AppState.killerPerksOnly = false;
      },

      killerOnly () {
        AppState.killerPerksOnly = true;
        AppState.survivorPerksOnly = false;
      },

      allPerks () {
        AppState.survivorPerksOnly = false;
        AppState.killerPerksOnly = false;
      }
    }
  }
}
</script>

<template>
  <div class="container-fluid">
    <div class="row m-auto justify-content-center my-3">
      <h3 class="text-center">Filter Perks</h3>
        <div class="col-8">
          <div class="row m-auto justify-content-evenly align-items-center">
            <div class="col-md-2 d-flex justify-content-center align-items-center my-2">
              <button @click="survivorOnly()" type="button" class="btn btn-outline-warning">Survivor</button>
            </div>
            <div class="col-md-2 d-flex justify-content-center align-items-center my-2">
              <button @click="allPerks()" type="button" class="btn btn-outline-light">All</button>
            </div>
            <div class="col-md-2 d-flex justify-content-center align-items-center my-2">
              <button @click="killerOnly()" type="button" class="btn btn-outline-danger">Killer</button>
            </div>
          </div>
          <div class="row m-auto pt-3 justify-content-center align-items-center">
            <div class="col-md-3 d-flex justify-content-center align-items-center">
              <label class="me-3" for="">Generic Only</label>
              <input type="checkbox" v-model="editable.generic" name="generic" id="generic">
            </div>
          </div>
        </div>
    </div>
    <div class="row m-auto">
        <div class="col-md-2 d-flex flex-column justify-content-center align-items-center p-3 mb-3" v-for="perk in perks">
          <div class="perk-icon-background d-flex justify-content-center align-items-center m-3">
            <img class="perk-icon" :src="perk.icon" alt="">
          </div>
          <div class="mt-3">
            <h6 class="text-center">{{ perk.name }}</h6>
          </div>
        </div>
    </div>
    <div class="row m-auto mb-3">
      <div class="col-6 text-end pe-3">
        <button @click="previousPage()" class="btn btn-outline-light">
          Previous
        </button>
      </div>
      <div class="col-6 text-start ps-3">
        <button @click="nextPage()" class="btn btn-outline-light">
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.filter-bar {
  height: 80px;
}

</style>
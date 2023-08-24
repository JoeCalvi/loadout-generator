<script>
import { computed, onMounted, watchEffect, ref } from "vue";
import { AppState } from "../AppState";
import { perksService } from "../services/PerksService";
import { statusEffectsService } from "../services/StatusEffectsService";

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

    async function getAllGenericPerks () {
      try {
        await perksService.getAllGenericPerks();
      } catch (error) {
        console.error(error)
      }
    }

    async function getAllGenericSurvivorPerks () {
      try {
        await perksService.getAllGenericSurvivorPerks();
      } catch (error) {
        console.error(error)
      }
    }

    async function getAllGenericKillerPerks () {
      try {
        await perksService.getAllGenericKillerPerks();
      } catch (error) {
        console.error(error)
      }
    }
 
    onMounted(() => {
      getAllPerks();
      statusEffectsService.getAllStatusEffects();
    })

    watchEffect(() => {
      if (AppState.survivorPerksOnly == true && editable.value.generic == true) {
        getAllGenericSurvivorPerks();
      } else if (AppState.killerPerksOnly == true && editable.value.generic == true) {
        getAllGenericKillerPerks();
      } else if (AppState.killerPerksOnly == true) {
        getAllKillerPerks();
      } else if (AppState.survivorPerksOnly == true) {
        getAllSurvivorPerks();
      } else if (AppState.killerPerksOnly == false && AppState.survivorPerksOnly == false && editable.value.generic == true) {
        getAllGenericPerks();
      } else if (AppState.killerPerksOnly == false && AppState.survivorPerksOnly == false) {
        getAllPerks();
      }
    })

    return {
      perks: computed(() => AppState.perks),
      activePerk: computed(() => AppState.activePerk),
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
      const main = document.getElementById("main")
      main.scrollTop = 0
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
        const main = document.getElementById("main")
        main.scrollTop = 0
      },

      survivorOnly () {
        AppState.survivorPerksOnly = true;
        AppState.killerPerksOnly = false;
        AppState.pageNumber = 1;
      },

      killerOnly () {
        AppState.killerPerksOnly = true;
        AppState.survivorPerksOnly = false;
        AppState.pageNumber = 1;
      },

      allPerks () {
        AppState.survivorPerksOnly = false;
        AppState.killerPerksOnly = false;
        AppState.pageNumber = 1;
      },

      async setActivePerk (perkId) {
        try {
          await perksService.getPerkById(perkId);
        } catch (error) {
          console.error(error)
        }
      }
    }
  }
}
</script>

<template>
  <div class="container-fluid">
    <div class="row m-auto justify-content-center my-3" id="filterBar">
      <h3 class="text-center">Filter Perks</h3>
        <div class="col-8">
          <div class="row m-auto justify-content-evenly align-items-center">
            <div class="col-md-2 d-flex justify-content-center align-items-center my-2">
              <button @click="survivorOnly()" type="button" class="btn btn-outline-warning" :disabled="survivorPerksOnly == true">Survivor</button>
            </div>
            <div class="col-md-2 d-flex justify-content-center align-items-center my-2">
              <button @click="allPerks()" type="button" class="btn btn-outline-light" :disabled="survivorPerksOnly == false && killerPerksOnly == false">All</button>
            </div>
            <div class="col-md-2 d-flex justify-content-center align-items-center my-2">
              <button @click="killerOnly()" type="button" class="btn btn-outline-danger" :disabled="killerPerksOnly == true">Killer</button>
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
            <img @click="setActivePerk(`${perk.id}`)" class="perk-icon selectable" :src="perk.icon" alt="" data-bs-toggle="modal" data-bs-target="#activePerkModal">
          </div>
          <div class="mt-3">
            <h6 class="text-center">{{ perk.name }}</h6>
          </div>
        </div>
    </div>
    <div v-if="editable.generic == false" class="row m-auto mb-3">
      <div class="col-6 text-end pe-3">
        <button @click="previousPage()" class="btn btn-outline-light">
          Previous
        </button>
      </div>
      <div class="col-6 text-start ps-3">
        <button @click="nextPage()"  class="btn btn-outline-light">
          Next
        </button>
      </div>
    </div>
  </div>


  <!-- Modal -->
<div class="modal fade" id="activePerkModal" tabindex="-1" aria-labelledby="activePerkModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content bg-dark border-white" v-if="activePerk != null">
      <div class="modal-header">
        <h1  class="modal-title fs-5" id="activePerkModalLabel">{{ activePerk.name }}</h1>
      </div>
      <div class="modal-body">
        <div class="container p-3">
          <div class="row">
            <div class="col-2 d-flex align-items-center justify-content-center">
              <div class="perk-icon-background d-flex justify-content-center align-items-center m-3">
                <img class="perk-icon" :src="activePerk.icon" alt="">
              </div>
            </div>
            <div class="col-10 d-flex justify-content-center align-items-center">
              <div>
                <h6 v-if="activePerk.generic == true">Generic {{ activePerk.role }} Perk</h6>
                <h6 v-if="activePerk.role == 'Survivor' && activePerk.generic == false">{{ activePerk.survivor.name }} Perk</h6>
                <h6 v-if="activePerk.role == 'Killer' && activePerk.generic == false">{{ activePerk.killer.killer_name }} Perk</h6>
                <i>
                  {{ activePerk.description }}
                </i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>

</style>
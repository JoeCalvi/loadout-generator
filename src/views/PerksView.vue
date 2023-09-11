<script>
import { computed, onMounted, watchEffect, ref } from "vue";
import { AppState } from "../AppState";
import { perksService } from "../services/PerksService";
import { statusEffectsService } from "../services/StatusEffectsService";
import Modal from "../components/Modal.vue";
import PageNumber from "../components/PageNumber.vue";

export default {
    data() {
        const editable = ref({ generic: false });
        async function getPageFromAllPerks() {
            try {
                await perksService.getPageFromAllPerks(AppState.pageNumber);
            }
            catch (error) {
                console.error(error);
            }
        }
        async function getAllSurvivorPerks() {
            try {
                await perksService.getAllSurvivorPerks();
            }
            catch (error) {
                console.error(error);
            }
        }
        async function getAllKillerPerks() {
            try {
                await perksService.getAllKillerPerks();
            }
            catch (error) {
                console.error(error);
            }
        }
        async function getAllGenericPerks() {
            try {
                await perksService.getAllGenericPerks();
            }
            catch (error) {
                console.error(error);
            }
        }
        async function getAllGenericSurvivorPerks() {
            try {
                await perksService.getAllGenericSurvivorPerks();
            }
            catch (error) {
                console.error(error);
            }
        }
        async function getAllGenericKillerPerks() {
            try {
                await perksService.getAllGenericKillerPerks();
            }
            catch (error) {
                console.error(error);
            }
        }
        onMounted(() => {
            if (AppState.survivorPerksOnly == true && editable.value.generic == true) {
                getAllGenericSurvivorPerks();
            }
            else if (AppState.killerPerksOnly == true && editable.value.generic == true) {
                getAllGenericKillerPerks();
            }
            else if (AppState.killerPerksOnly == true) {
                AppState.maxPageNumber = 4;
                AppState.pages = [];
                for (let i = 0; i <= AppState.maxPageNumber - 1; i++) {
                  let pageNumber = i + 1;
                  AppState.pages.push(pageNumber)
                }
                console.log("amount of pages:", AppState.pages.length)
                getAllKillerPerks();
            }
            else if (AppState.survivorPerksOnly == true) {
                AppState.maxPageNumber = 5;
                AppState.pages = [];
                for (let i = 0; i <= AppState.maxPageNumber - 1; i++) {
                  let pageNumber = i + 1;
                  AppState.pages.push(pageNumber)
                }
                console.log("amount of pages:", AppState.pages.length)
                getAllSurvivorPerks();
            }
            else if (AppState.killerPerksOnly == false && AppState.survivorPerksOnly == false && editable.value.generic == true) {
                getAllGenericPerks();
            }
            else if (AppState.killerPerksOnly == false && AppState.survivorPerksOnly == false) {
                AppState.maxPageNumber = 9;
                AppState.pages = [];
                for (let i = 0; i <= AppState.maxPageNumber - 1; i++) {
                  let pageNumber = i + 1;
                  AppState.pages.push(pageNumber)
                }
                console.log("amount of pages:", AppState.pages.length)
                getPageFromAllPerks();
            }
            statusEffectsService.getAllStatusEffects();
        });

        watchEffect(() => {
            if (AppState.survivorPerksOnly == true && editable.value.generic == true) {
                getAllGenericSurvivorPerks();
            }
            else if (AppState.killerPerksOnly == true && editable.value.generic == true) {
                getAllGenericKillerPerks();
            }
            else if (AppState.killerPerksOnly == true) {
                AppState.maxPageNumber = 4;
                AppState.pages = [];
                for (let i = 0; i <= AppState.maxPageNumber - 1; i++) {
                  let pageNumber = i + 1;
                  AppState.pages.push(pageNumber)
                }
                console.log("pages:", AppState.pages)
                getAllKillerPerks();
            }
            else if (AppState.survivorPerksOnly == true) {
                AppState.maxPageNumber = 5;
                AppState.pages = [];
                for (let i = 0; i <= AppState.maxPageNumber - 1; i++) {
                  let pageNumber = i + 1;
                  AppState.pages.push(pageNumber)
                }
                console.log("pages:", AppState.pages)
                getAllSurvivorPerks();
            }
            else if (AppState.killerPerksOnly == false && AppState.survivorPerksOnly == false && editable.value.generic == true) {
                getAllGenericPerks();
            }
            else if (AppState.killerPerksOnly == false && AppState.survivorPerksOnly == false) {
                AppState.maxPageNumber = 9;
                AppState.pages = [];
                for (let i = 0; i <= AppState.maxPageNumber - 1; i++) {
                  let pageNumber = i + 1;
                  AppState.pages.push(pageNumber)
                }
                console.log("pages:", AppState.pages)
                getPageFromAllPerks();
            }
        });
        return {
            perks: computed(() => AppState.perks),
            activePerk: computed(() => AppState.activePerk),
            pageNumber: computed(() => AppState.pageNumber),
            pages: computed(() => AppState.pages),
            survivorPerksOnly: computed(() => AppState.survivorPerksOnly),
            killerPerksOnly: computed(() => AppState.killerPerksOnly),
            editable,
            getPageFromAllPerks,
            getAllKillerPerks,
            getAllSurvivorPerks,

            setPage(pageNumber) {
                AppState.pageNumber = pageNumber;
                console.log("page number:", AppState.pageNumber)
            },

            previousPage() {
                if (AppState.survivorPerksOnly == false && AppState.killerPerksOnly == false && editable.value.generic == false) {
                    if (AppState.pageNumber == 1) {
                        AppState.pageNumber = 9;
                    }
                    else if (AppState.pageNumber > 1) {
                        AppState.pageNumber--;
                    }
                }
                else if (AppState.survivorPerksOnly == true && AppState.killerPerksOnly == false && editable.value.generic == false) {
                    if (AppState.pageNumber == 1) {
                        AppState.pageNumber = 5;
                    }
                    else if (AppState.pageNumber > 1) {
                        AppState.pageNumber--;
                    }
                }
                else if (AppState.survivorPerksOnly == false && AppState.killerPerksOnly == true && editable.value.generic == false) {
                    if (AppState.pageNumber == 1) {
                        AppState.pageNumber = 4;
                    }
                    else if (AppState.pageNumber > 1) {
                        AppState.pageNumber--;
                    }
                }
                const main = document.getElementById("main");
                main.scrollTop = 0;
            },
            nextPage() {
                if (AppState.survivorPerksOnly == false && AppState.killerPerksOnly == false && editable.value.generic == false) {
                    if (AppState.pageNumber == 9) {
                        AppState.pageNumber = 1;
                    }
                    else if (AppState.pageNumber < 9) {
                        AppState.pageNumber++;
                    }
                }
                else if (AppState.survivorPerksOnly == true && AppState.killerPerksOnly == false && editable.value.generic == false) {
                    if (AppState.pageNumber == 5) {
                        AppState.pageNumber = 1;
                    }
                    else if (AppState.pageNumber < 5) {
                        AppState.pageNumber++;
                    }
                }
                else if (AppState.survivorPerksOnly == false && AppState.killerPerksOnly == true && editable.value.generic == false) {
                    if (AppState.pageNumber == 4) {
                        AppState.pageNumber = 1;
                    }
                    else if (AppState.pageNumber < 4) {
                        AppState.pageNumber++;
                    }
                }
                const main = document.getElementById("main");
                main.scrollTop = 0;
            },
            survivorOnly() {
                AppState.survivorPerksOnly = true;
                AppState.killerPerksOnly = false;
                AppState.pageNumber = 1;
            },
            killerOnly() {
                AppState.killerPerksOnly = true;
                AppState.survivorPerksOnly = false;
                AppState.pageNumber = 1;
            },
            allPerks() {
                AppState.survivorPerksOnly = false;
                AppState.killerPerksOnly = false;
                AppState.pageNumber = 1;
            },
            async setActivePerk(perkId) {
                try {
                    await perksService.getPerkById(perkId);
                }
                catch (error) {
                    console.error(error);
                }
            }
        };
    },
    components: { Modal, PageNumber }
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
            <img @click="setActivePerk(`${perk.id}`)" class="perk-icon selectable" :src="perk.icon" :alt="perk.name" :title="perk.name" data-bs-toggle="modal" data-bs-target="#activePerkModal">
          </div>
          <div class="mt-3">
            <h6 class="text-center">{{ perk.name }}</h6>
          </div>
        </div>
    </div>
    <div v-if="editable.generic == false" class="row m-auto mb-3 justify-content-center align-items-center">
      <div class="col-6 d-flex justify-content-evenly pe-3">
        <div>
          <button @click="previousPage()" class="btn btn-outline-light">
            <span class="mdi mdi-chevron-left"></span>
          </button>
        </div>
        <PageNumber v-for="page in pages" :pageNumber="page" @click="setPage(`${page}`)"/>
        <div>
          <button @click="nextPage()"  class="btn btn-outline-light">
            <span class="mdi mdi-chevron-right"></span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal -->
<Modal v-if="activePerk != null">
        <div class="modal-header">
        <h1  class="modal-title fs-5" id="activePerkModalLabel">{{ activePerk.name }}</h1>
      </div>
      <div class="modal-body">
        <div class="container p-3">
          <div class="row m-auto">
            <div class="col-2 d-flex align-items-center justify-content-center">
              <div class="perk-icon-background d-flex justify-content-center align-items-center m-3">
                <img class="perk-icon" :src="activePerk.icon" :alt="activePerk.name" :title="activePerk.name">
              </div>
            </div>
            <div class="col-10 d-flex justify-content-center align-items-center">
              <div class="row m-auto">
                <h6 v-if="activePerk.generic == true">Generic {{ activePerk.role }} Perk</h6>
                <h6 v-if="activePerk.role == 'Survivor' && activePerk.generic == false">
                  <router-link class="text-danger text-decoration-none" :to="{ name: 'survivor', params: { survivorId: activePerk.survivor_id }}">
                    <span class="selectable" data-bs-dismiss="modal">{{ activePerk.survivor.name }}</span>
                  </router-link>
                   Perk</h6>
                <h6 v-if="activePerk.role == 'Killer' && activePerk.generic == false">
                  <router-link class="text-danger text-decoration-none" :to="{ name: 'killer', params: { killerId: activePerk.killer_id }}">
                    <span class="selectable" data-bs-dismiss="modal">{{ activePerk.killer.killer_name }}</span>
                  </router-link>
                   Perk</h6>
                <i class="px-4">
                  {{ activePerk.description }}
                </i>
                <div class="col-12" v-if="activePerk.associated_status_effects.length > 0">
                  <h6 class="mt-2">Associated Status Effects</h6>
                  <div class="row m-auto">
                    <div v-for="effect in activePerk.associated_status_effects" class="col-1 p-0 d-flex d-md-none mx-3 justify-content-center align-items-center">
                      <img class="status-effect-icon selectable" :src="effect.icon" :alt="effect.name" :title="effect.name" data-bs-toggle="collapse" :data-bs-target="'#'+ effect._id">
                    </div>
                    <div v-for="effect in activePerk.associated_status_effects" class="col-1 p-0 d-none d-md-flex justify-content-center align-items-center">
                      <img class="status-effect-icon selectable" :src="effect.icon" :alt="effect.name" :title="effect.name" data-bs-toggle="collapse" :data-bs-target="'#'+ effect._id">
                    </div>
                    <div v-for="effect in activePerk.associated_status_effects" class="collapse mt-3" :id="effect._id">
                      <div class="card card-body bg-dark border-light text-light">
                        <i>
                          {{ effect.description }}
                        </i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
</Modal>
</template>

<style scoped>

</style>
<script>
import { survivorsService } from "../services/SurvivorsService";
import { killersService } from "../services/KillersService";
import Modal from "./modal.vue";
import { computed } from "vue";
import { AppState } from "../AppState";

export default {
    props: {
        loadout: {
            type: Array,
            required: true
        }
    },
    data() {
        async function getSurvivorById(survivorId) {
            try {
                await survivorsService.getSurvivorById(survivorId);
            }
            catch (error) {
                console.error(error);
            }
        }
        async function getKillerById(killerId) {
            try {
                await killersService.getKillerById(killerId);
            }
            catch (error) {
                console.error(error);
            }
        }
        return {
            getSurvivorById,
            getKillerById,
            activeSurvivor: computed(() => AppState.activeSurvivor),
            activeKiller: computed(() => AppState.activeKiller)
        };
    },
    components: { Modal }
}
</script>

<template>
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
                <p v-if="loadout[0] && loadout[0].role == 'Survivor' && loadout[0].survivor">
                  <router-link class="text-danger text-decoration-none" :to="{ name: 'survivor', params: { survivorId: loadout[0].survivor_id }}" target="_blank">
                    <span class="selectable" @click="getSurvivorById(`${loadout[0].survivor_id}`)">{{ loadout[0].survivor.name }}</span>
                  </router-link>
                   Perk</p>
                <p v-if="loadout[0] && loadout[0].role == 'Survivor' && !loadout[0].survivor">General Survivor Perk</p>
                <p v-if="loadout[0] && loadout[0].role == 'Killer' && loadout[0].killer">
                  <router-link class="text-danger text-decoration-none" :to="{ name: 'killer', params: { killerId: loadout[0].killer_id }}" target="_blank">
                    <span class="selectable" @click="getKillerById(`${loadout[0].killer_id}`)">{{ loadout[0].killer.killer_name }}</span>
                  </router-link>
                   Perk</p>
                <p v-if="loadout[0] && loadout[0].role == 'Killer' && !loadout[0].killer">General Killer Perk</p>
                <i v-if="loadout[0]">{{ loadout[0].description }}</i>
                <div class="row mt-3" v-if="loadout[0] && loadout[0].associated_status_effects.length > 0">
                  <h6 class="mt-2">Associated Status Effects</h6>
                  <div v-for="effect in loadout[0].associated_status_effects" class="col-1 p-0 d-flex d-md-none mx-2 justify-content-center align-items-center">
                    <img class="status-effect-icon selectable" :src="effect.icon" :alt="effect.name" :title="effect.name">
                  </div>
                  <div v-for="effect in loadout[0].associated_status_effects" class="col-1 p-0 d-none d-md-flex justify-content-center align-items-center">
                    <img class="status-effect-icon selectable" :src="effect.icon" :alt="effect.name" :title="effect.name">
                  </div>
                </div>
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
                <p v-if="loadout[1] && loadout[0].role == 'Survivor' && loadout[1].survivor">
                  <router-link class="text-danger text-decoration-none" :to="{ name: 'survivor', params: { survivorId: loadout[1].survivor_id }}" target="_blank">
                    <span class="selectable" @click="getSurvivorById(`${loadout[1].survivor_id}`)">{{ loadout[1].survivor.name }}</span>
                  </router-link>
                   Perk</p>
                <p v-if="loadout[1] && loadout[0].role == 'Survivor' && !loadout[1].survivor">General Survivor Perk</p>
                <p v-if="loadout[1] && loadout[1].role == 'Killer' && loadout[1].killer">
                  <router-link class="text-danger text-decoration-none" :to="{ name: 'killer', params: { killerId: loadout[1].killer_id }}" target="_blank">
                    <span class="selectable" @click="getKillerById(`${loadout[1].killer_id}`)">{{ loadout[1].killer.killer_name }}</span>
                  </router-link>
                   Perk</p>
                <p v-if="loadout[1] && loadout[1].role == 'Killer' && !loadout[1].killer">General Killer Perk</p>
                <i v-if="loadout[1]">{{ loadout[1].description }}</i>
                <div class="row mt-3" v-if="loadout[1] && loadout[1].associated_status_effects.length > 0">
                  <h6 class="mt-2">Associated Status Effects</h6>
                  <div v-for="effect in loadout[1].associated_status_effects" class="col-1 p-0 d-flex d-md-none mx-2 justify-content-center align-items-center">
                    <img class="status-effect-icon selectable" :src="effect.icon" :alt="effect.name" :title="effect.name">
                  </div>
                  <div v-for="effect in loadout[1].associated_status_effects" class="col-1 p-0 d-none d-md-flex justify-content-center align-items-center">
                    <img class="status-effect-icon selectable" :src="effect.icon" :alt="effect.name" :title="effect.name">
                  </div>
                </div>
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
                <p v-if="loadout[2] && loadout[0].role == 'Survivor' && loadout[2].survivor">
                  <router-link class="text-danger text-decoration-none" :to="{ name: 'survivor', params: { survivorId: loadout[2].survivor_id }}" target="_blank">
                    <span class="selectable" @click="getSurvivorById(`${loadout[2].survivor_id}`)">{{ loadout[2].survivor.name }}</span>
                  </router-link>
                   Perk</p>
                <p v-if="loadout[2] && loadout[0].role == 'Survivor' && !loadout[2].survivor">General Survivor Perk</p>
                <p v-if="loadout[2] && loadout[2].role == 'Killer' && loadout[2].killer">
                  <router-link class="text-danger text-decoration-none" :to="{ name: 'killer', params: { killerId: loadout[2].killer_id }}" target="_blank">
                    <span class="selectable" @click="getKillerById(`${loadout[2].killer_id}`)">{{ loadout[2].killer.killer_name }}</span>
                  </router-link>
                   Perk</p>
                <p v-if="loadout[2] && loadout[2].role == 'Killer' && !loadout[2].killer">General Killer Perk</p>
                <i v-if="loadout[2]">{{ loadout[2].description }}</i>
                <div class="row mt-3" v-if="loadout[2] && loadout[2].associated_status_effects.length > 0">
                  <h6 class="mt-2">Associated Status Effects</h6>
                  <div v-for="effect in loadout[2].associated_status_effects" class="col-1 p-0 d-flex d-md-none mx-2 justify-content-center align-items-center">
                    <img class="status-effect-icon selectable" :src="effect.icon" :alt="effect.name" :title="effect.name">
                  </div>
                  <div v-for="effect in loadout[2].associated_status_effects" class="col-1 p-0 d-none d-md-flex justify-content-center align-items-center">
                    <img class="status-effect-icon selectable" :src="effect.icon" :alt="effect.name" :title="effect.name">
                  </div>
                </div>
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
                <p v-if="loadout[3] && loadout[0].role == 'Survivor' && loadout[3].survivor">
                  <router-link class="text-danger text-decoration-none" :to="{ name: 'survivor', params: { survivorId: loadout[3].survivor_id }}" target="_blank">
                    <span class="text-danger selectable" @click="getSurvivorById(`${loadout[3].survivor_id}`)">{{ loadout[3].survivor.name }}</span>
                  </router-link>
                   Perk</p>
                <p v-if="loadout[3] && loadout[0].role == 'Survivor' && !loadout[3].survivor">General Survivor Perk</p>
                <p v-if="loadout[3] && loadout[3].role == 'Killer' && loadout[3].killer">
                  <router-link class="text-danger text-decoration-none" :to="{ name: 'killer', params: { killerId: loadout[3].killer_id }}" target="_blank">
                    <span class="selectable" @click="getKillerById(`${loadout[3].killer_id}`)">{{ loadout[3].killer.killer_name }}</span>
                  </router-link>
                   Perk</p>
                <p v-if="loadout[3] && loadout[3].role == 'Killer' && !loadout[3].killer">General Killer Perk</p>
                <i v-if="loadout[3]">{{ loadout[3].description }}</i>
                <div class="row mt-3" v-if="loadout[3] && loadout[3].associated_status_effects.length > 0">
                  <h6 class="mt-2">Associated Status Effects</h6>
                  <div v-for="effect in loadout[3].associated_status_effects" class="col-1 p-0 d-flex d-md-none mx-2 justify-content-center align-items-center">
                    <img class="status-effect-icon selectable" :src="effect.icon" :alt="effect.name" :title="effect.name">
                  </div>
                  <div v-for="effect in loadout[3].associated_status_effects" class="col-1 p-0 d-none d-md-flex justify-content-center align-items-center">
                    <img class="status-effect-icon selectable" :src="effect.icon" :alt="effect.name" :title="effect.name">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <Modal>
      <div class="modal-header">
        <h1 v-if="activeSurvivor != null && activeKiller == null" class="modal-title fs-5" id="activePerkModalLabel">{{ activeSurvivor.name }}</h1>
      </div>
      <div class="modal-body">
        <div class="container-fluid p-3">
          <div class="row w-100 m-auto">
            <div class="col-md-4 d-flex align-items-center justify-content-center my-2">
                <img v-if="activeSurvivor != null && activeKiller == null" :src="activeSurvivor.portrait" :alt="activeSurvivor.name" :title="activeSurvivor.name">
            </div>
            <div class="col-md-8 d-flex flex-column align-items-center">
              <div class="row w-100 m-auto">
                <div class="col-md-4 d-flex justify-content-center p-3 mb-3">
                  <div class="perk-icon-background d-flex justify-content-center align-items-center">
                    <img v-if="activeSurvivor.perk_one" class="perk-icon" :src="activeSurvivor.perk_one.icon" :alt="activeSurvivor.perk_one.name" :title="activeSurvivor.perk_one.name">
                  </div>
                </div>
                <div class="col-md-4 d-flex justify-content-center p-3 mb-3">
                  <div class="perk-icon-background d-flex justify-content-center align-items-center">
                    <img v-if="activeSurvivor.perk_two" class="perk-icon" :src="activeSurvivor.perk_two.icon" :alt="activeSurvivor.perk_two.name" :title="activeSurvivor.perk_two.name">
                  </div>
                </div>
                <div class="col-md-4 d-flex justify-content-center p-3 mb-3">
                  <div class="perk-icon-background d-flex justify-content-center align-items-center">
                    <img v-if="activeSurvivor.perk_three" class="perk-icon" :src="activeSurvivor.perk_three.icon" :alt="activeSurvivor.perk_three.name" :title="activeSurvivor.perk_three.name">
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </Modal>
</template>
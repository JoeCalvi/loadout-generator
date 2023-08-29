<script>
import { computed, onMounted, onUnmounted } from "vue";
import { AppState } from "../AppState";
import { survivorsService } from "../services/SurvivorsService";
import { useRoute } from "vue-router";
import Perk from "../components/Perk.vue";

export default {
    data() {
        const route = useRoute();
        async function getSurvivorById() {
            try {
                const survivorId = route.params.survivorId;
                await survivorsService.getSurvivorById(survivorId);
            }
            catch (error) {
                console.error(error);
            }
        }
        onMounted(() => {
            getSurvivorById();
        });
        onUnmounted(() => {
            AppState.activeSurvivor = null;
        });
        return {
            survivor: computed(() => AppState.activeSurvivor)
        };
    },
    components: { Perk }
}
</script>

<template>
  <div v-if="survivor"  class="container-fluid h-100">
    <div class="row m-auto h-100 align-items-center">
      <div class="col-md-3 d-flex flex-column justify-content-evenly align-items-center my-3">
        <div class="d-flex flex-column justify-content-center align-items-center">
          <img class="mb-3" :src="survivor.portrait" :alt="survivor.name" :title="survivor.name">
          <h5>{{ survivor.name }}</h5>
          <i><h6>{{ survivor.role }}</h6></i>
        </div>
        <div class="mb-3">
          <i>{{ survivor.overview }}</i>
        </div>
      </div>
      <div class="col-md-9 d-flex flex-column justify-content-evenly align-items-center">
        <h3 class="w-100 text-center my-4">Unique Perks</h3>
        <div class="row m-auto py-3 align-items-center">
          <div class="col-12 d-flex align-items-center justify-content-center">
            <div class="row w-100 m-auto py-4 justify-content-between align-items-center border border-white border-opacity-25 border-start-0 border-end-0">
              <Perk :perk="survivor.perk_one"/>
            </div>
          </div>
        </div>
        <div class="col-12 d-flex align-items-center justify-content-center">
            <div class="row w-100 m-auto py-4 justify-content-between align-items-center border-bottom border-white border-opacity-25">
              <Perk :perk="survivor.perk_two"/>
            </div>
        </div>
        <div class="col-12 d-flex align-items-center justify-content-center mb-3">
            <div class="row w-100 m-auto py-4 justify-content-between align-items-center border-bottom border-white border-opacity-25">
              <Perk :perk="survivor.perk_three" />
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
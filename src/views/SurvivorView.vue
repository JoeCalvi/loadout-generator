<script>
import { computed, onMounted, onUnmounted } from "vue";
import { AppState } from "../AppState";
import { survivorsService } from "../services/SurvivorsService";
import { useRoute } from "vue-router";

export default {
  data() {
    const route = useRoute();
    async function getSurvivorById () {
      try {
        const survivorId = route.params.survivorId
        await survivorsService.getSurvivorById(survivorId);
      } catch (error) {
        console.error(error)
      }
    }

    onMounted(() => {
      getSurvivorById()
    })

    onUnmounted(() => {
      AppState.activeSurvivor = null;
    })

    return {
      survivor: computed(() => AppState.activeSurvivor)
    }
  }
}
</script>

<template>
  <div v-if="survivor"  class="container-fluid h-100">
    <div class="row m-auto h-100 align-items-center">
      <div class="col-md-3 d-flex flex-column justify-content-evenly align-items-center my-3">
        <div class="d-flex flex-column justify-content-center align-items-center">
          <img class="mb-3" :src="survivor.portrait" :alt="survivor.name" :title="survivor.name">
          <h5>
            {{ survivor.name }}
          </h5>
          <i>
            <h6>
              {{ survivor.role }}
            </h6>
          </i>
        </div>
        <div>
          <i>
              {{ survivor.overview }}
          </i>
        </div>
      </div>
      <div class="col-md-9 d-flex flex-column justify-content-evenly align-items-center">
        <h3 class="w-100 text-center mb-3">Unique Perks</h3>
        <div class="row m-auto mb-3 w-100 align-items-center">
          <div class="col-md-2 d-flex justify-content-center mb-3">
            <div class="perk-icon-background d-flex justify-content-center align-items-center m-3">
              <img class="perk-icon" :src="survivor.perk_one.icon" alt="">
            </div>
          </div>
          <div class="col-md-10 d-flex flex-column justify-content-center">
            <h6>
              {{ survivor.perk_one.name }}
            </h6>
            <i>
              {{ survivor.perk_one.description }}
            </i>
          </div>
        </div>
        <div class="row m-auto mb-3 w-100 align-items-center">
          <div class="col-md-2 d-flex justify-content-center mb-3">
            <div class="perk-icon-background d-flex justify-content-center align-items-center m-3">
              <img class="perk-icon" :src="survivor.perk_two.icon" alt="">
            </div>
          </div>
          <div class="col-md-10 d-flex flex-column justify-content-center">
            <h6>
              {{ survivor.perk_two.name }}
            </h6>
            <i>
              {{ survivor.perk_two.description }}
            </i>
          </div>
        </div>
        <div class="row m-auto mb-3 w-100 align-items-center">
          <div class="col-md-2 d-flex justify-content-center mb-3">
            <div class="perk-icon-background d-flex justify-content-center align-items-center m-3">
              <img class="perk-icon" :src="survivor.perk_three.icon" alt="">
            </div>
          </div>
          <div class="col-md-10 d-flex flex-column justify-content-center">
            <h6>
              {{ survivor.perk_three.name }}
            </h6>
            <i>
              {{ survivor.perk_three.description }}
            </i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
<script>
import { computed, onMounted, onUnmounted } from "vue";
import { AppState } from "../AppState";
import { killersService } from "../services/KillersService";
import { useRoute } from "vue-router";

export default {
  data() {
    const route = useRoute();
    async function getKillerById () {
      try {
        const killerId = route.params.killerId;
        await killersService.getKillerById(killerId);
      } catch (error) {
        console.error(error)
      }
    }

    onMounted(() => {
      getKillerById()
    })

    onUnmounted(() => {
      AppState.activeKiller = null;
    })

    return {
      killer: computed(() => AppState.activeKiller)
    }
  }
}
</script>

<template>
  <div v-if="killer"  class="container-fluid h-100">
    <div class="row m-auto h-100 align-items-center">
      <div class="col-md-3 d-flex flex-column justify-content-evenly align-items-center my-3">
        <div class="d-flex flex-column justify-content-center align-items-center">
          <img class="mb-3" :src="killer.portrait" :alt="killer.killer_name" :title="killer.killer_name">
          <h5>
            {{ killer.killer_name }}
          </h5>
          <i>
            <h6>
              {{ killer.role }}
            </h6>
          </i>
        </div>
        <div>
          <i>
              {{ killer.overview }}
          </i>
        </div>
      </div>
      <div class="col-md-9 d-flex flex-column justify-content-evenly align-items-center">
        <h3 class="w-100 text-center mb-3">Unique Perks</h3>
        <div class="row m-auto mb-3 w-100 align-items-center">
          <div class="col-md-2 d-flex justify-content-center mb-3">
            <div class="perk-icon-background d-flex justify-content-center align-items-center m-3">
              <img class="perk-icon" :src="killer.perk_one.icon" :alt="killer.perk_one.name" :title="killer.perk_one.name">
            </div>
          </div>
          <div class="col-md-10 d-flex flex-column justify-content-center">
            <h6>
              {{ killer.perk_one.name }}
            </h6>
            <i>
              {{ killer.perk_one.description }}
            </i>
          </div>
        </div>
        <div class="row m-auto mb-3 w-100 align-items-center">
          <div class="col-md-2 d-flex justify-content-center mb-3">
            <div class="perk-icon-background d-flex justify-content-center align-items-center m-3">
              <img class="perk-icon" :src="killer.perk_two.icon" :alt="killer.perk_two.name" :title="killer.perk_two.name">
            </div>
          </div>
          <div class="col-md-10 d-flex flex-column justify-content-center">
            <h6>
              {{ killer.perk_two.name }}
            </h6>
            <i>
              {{ killer.perk_two.description }}
            </i>
          </div>
        </div>
        <div class="row m-auto mb-3 w-100 align-items-center">
          <div class="col-md-2 d-flex justify-content-center mb-3">
            <div class="perk-icon-background d-flex justify-content-center align-items-center m-3">
              <img class="perk-icon" :src="killer.perk_three.icon" :alt="killer.perk_three.name" :title="killer.perk_three.name">
            </div>
          </div>
          <div class="col-md-10 d-flex flex-column justify-content-center">
            <h6>
              {{ killer.perk_three.name }}
            </h6>
            <i>
              {{ killer.perk_three.description }}
            </i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
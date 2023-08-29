<script>
import { computed, onMounted, onUnmounted } from "vue";
import { AppState } from "../AppState";
import { killersService } from "../services/KillersService";
import { useRoute } from "vue-router";
import Perk from "../components/Perk.vue";

export default {
    data() {
        const route = useRoute();
        async function getKillerById() {
            try {
                const killerId = route.params.killerId;
                await killersService.getKillerById(killerId);
            }
            catch (error) {
                console.error(error);
            }
        }
        onMounted(() => {
            getKillerById();
        });
        onUnmounted(() => {
            AppState.activeKiller = null;
        });
        return {
            killer: computed(() => AppState.activeKiller)
        };
    },
    components: { Perk }
}
</script>

<template>
  <div v-if="killer"  class="container-fluid h-100">
    <div class="row m-auto h-100 align-items-center">
      <div class="col-md-3 d-flex flex-column justify-content-evenly align-items-center my-3">
        <div class="d-flex flex-column justify-content-center align-items-center">
          <img class="mb-3" :src="killer.portrait" :alt="killer.killer_name" :title="killer.killer_name">
          <h5>{{ killer.killer_name }}</h5>
          <i><h6>{{ killer.role }}</h6></i>
        </div>
        <div class="mb-3">
          <i>{{ killer.overview }}</i>
        </div>
      </div>
      <div class="col-md-9 d-flex flex-column justify-content-evenly align-items-center">
        <h3 class="w-100 text-center my-4">Unique Perks</h3>
        <div class="row m-auto py-3 align-items-center">
          <div class="col-12 d-flex align-items-center justify-content-center">
            <div class="row w-100 m-auto py-4 justify-content-between align-items-center border border-white border-opacity-25 border-start-0 border-end-0">
              <Perk :perk="killer.perk_one"/>
            </div>
          </div>
        </div>
        <div class="col-12 d-flex align-items-center justify-content-center">
            <div class="row w-100 m-auto py-4 justify-content-between align-items-center border-bottom border-white border-opacity-25">
              <Perk :perk="killer.perk_two"/>
            </div>
        </div>
        <div class="col-12 d-flex align-items-center justify-content-center mb-3">
            <div class="row w-100 m-auto py-4 justify-content-between align-items-center border-bottom border-white border-opacity-25">
              <Perk :perk="killer.perk_three" />
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
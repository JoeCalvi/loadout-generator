<script>
import { computed, onMounted } from "vue";
import { AppState } from "../AppState";
import { killersService } from "../services/KillersService";

export default {
  data() {
    async function getAllKillers () {
        try {
          await killersService.getAllKillers();
        } catch (error) {
          console.error(error);
        }
      }

    onMounted(() => {
      getAllKillers();
    })

    return {
      killers: computed(() => AppState.killers)
    }
  }
}
</script>

<template>
  <div class="container-fluid">
    <div class="row m-auto">
      <div v-for="killer in killers" class="col-md-3 d-flex flex-column justify-content-center mb-3">
        <router-link class="d-flex justify-content-center" :to="{ name: 'killer', params: { killerId: killer.id} }">
          <img class="selectable" :src="killer.portrait" :alt="killer.killer_name" :title="killer.killer_name">
        </router-link>
      </div>
    </div>
  </div>
</template>
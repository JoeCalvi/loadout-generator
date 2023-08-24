<script>
import { computed, onMounted } from "vue";
import { AppState } from "../AppState";
import { survivorsService } from "../services/SurvivorsService";

export default {
  data() {
    async function getAllSurvivors () {
      try {
        await survivorsService.getAllSurvivors();
      } catch (error) {
        console.error(error)
      }
    }

    onMounted(() => {
      getAllSurvivors();
    })

    return {
      survivors: computed(() => AppState.survivors)
    }
  }
}
</script>

<template>
  <div class="container-fluid">
    <div class="row m-auto">
      <div v-for="survivor in survivors" class="col-md-3 d-flex flex-column justify-content-center mb-3">
        <router-link class="d-flex justify-content-center" :to="{ name: 'survivor', params: { survivorId: survivor.id} }">
          <img class="selectable" :src="survivor.portrait" :alt="survivor.name" :title="survivor.name">
        </router-link>
      </div>
    </div>
  </div>
</template>
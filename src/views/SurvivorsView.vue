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
      <div class="col-12 d-flex flex-column justify-content-center">
        <div class="row m-auto">
          <div class="col-3 d-flex justify-content-center align-items-center" v-for="survivor in survivors">
              <img :src="survivor.portrait" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
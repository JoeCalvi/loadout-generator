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
      <div class="col-12 d-flex flex-column justify-content-center">
        <div class="row m-auto">
          <div class="col-3 d-flex justify-content-center align-items-center" v-for="killer in killers">
              <img :src="killer.portrait" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
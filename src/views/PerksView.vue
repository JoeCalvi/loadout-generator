<script>
import { computed, onMounted } from "vue";
import { AppState } from "../AppState";
import { perksService } from "../services/PerksService";

export default {
  data() {
    async function getAllPerks () {
      try {
        await perksService.getAllPerks();
      } catch (error) {
        console.error(error);
      }
    }

    onMounted(() => {
      getAllPerks();
    })

    return {
      perks: computed(() => AppState.perks)
    }
  }
}
</script>

<template>
  <div class="container-fluid">
    <div class="row m-auto">
      <div class="col-12 d-flex flex-column justify-content-center">
        <div class="row m-auto">
          <div class="col-3 d-flex justify-content-center align-items-center" v-for="perk in perks">
              <img :src="perk.icon" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
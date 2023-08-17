<script>
import { computed, onMounted } from "vue";
import { AppState } from "../AppState";
import { killersService } from "../services/KillersService";
import { survivorsService } from "../services/SurvivorsService";
import { perksService } from "../services/PerksService";

export default {
  data() {
    async function getAllKillers () {
        try {
          await killersService.getAllKillers();
        } catch (error) {
          console.error(error);
        }
      }

    async function getAllSurvivors () {
      try {
        await survivorsService.getAllSurvivors();
      } catch (error) {
        console.error(error)
      }
    }

    async function getAllPerks () {
      try {
        await perksService.getAllPerks();
      } catch (error) {
        console.error(error)
      }
    }

    onMounted(() => {
      getAllKillers();
      getAllSurvivors();
      getAllPerks();
    })

    return {
      perks: computed(() => AppState.perks),
      killers: computed(() => AppState.killers),
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

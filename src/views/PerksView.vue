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
      perks: computed(() => AppState.perks),
      pageNumber: computed(() => AppState.pageNumber),

      previousPage () {
        if (AppState.pageNumber > 1 ) {
          AppState.pageNumber--;
          console.log(AppState.pageNumber)
        }
    },

      nextPage () {
        if (AppState.pageNumber < 10) {
          AppState.pageNumber++;
          console.log(AppState.pageNumber)
        }
    }
    }
  }
}
</script>

<template>
  <div class="container-fluid">
    <div class="row m-auto my-3">
      <h3 class="text-center">Filter Perks</h3>
        <form class="col-12" action="">
          <div class="row m-auto d-flex justify-content-evenly align-items-center">
            <div class="col-md-1 d-flex justify-content-center align-items-center my-2">
              <button type="button" class="btn btn-outline-light">All</button>
            </div>
            <div class="col-md-1 d-flex justify-content-between align-items-center mb-2">
              <label class="mb-1 me-4" for="">Survivor</label>
              <input type="checkbox" name="" id="">
            </div>
            <div class="col-md-1 d-flex justify-content-between align-items-center mb-2">
              <label class="mb-1" for="">Killer</label>
              <input type="checkbox" name="" id="">
            </div>
            <div class="col-md-1 d-flex justify-content-between align-items-center mb-2">
              <label class="mb-1 me-4" for="">Generic</label>
              <input type="checkbox" name="" id="">
            </div>
          </div>
        </form>
    </div>
    <div class="row m-auto">
        <div class="col-md-2 d-flex flex-column justify-content-center align-items-center p-3 mb-3" v-for="perk in perks">
          <div class="perk-icon-background d-flex justify-content-center align-items-center m-3">
            <img class="perk-icon" :src="perk.icon" alt="">
          </div>
          <div class="mt-3">
            <h6 class="text-center">{{ perk.name }}</h6>
          </div>
        </div>
    </div>
    <div class="row m-auto">
      <div class="col-6 text-end pe-3">
        <button @click="previousPage(pageNumber)" :disabled="pageNumber == 1" class="btn btn-outline-light">
          Previous
        </button>
      </div>
      <div class="col-6 text-start ps-3">
        <button @click="nextPage(pageNumber)" :disabled="pageNumber == 10" class="btn btn-outline-light">
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.filter-bar {
  height: 80px;
}

</style>
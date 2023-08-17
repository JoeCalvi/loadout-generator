<script>
import { computed, onMounted } from "vue";
import { AppState } from "../AppState";
import { killersService } from "../services/KillersService";
import { survivorsService } from "../services/SurvivorsService";
import { perksService } from "../services/PerksService";

export default {
  data() {

    return {

    }
  }
}
</script>

<template>
  <div class="container-fluid">
    <div class="row m-auto">
      <div class="col-12 d-flex justify-content-center">
        <h1 class="text-light">Welcome to my Dead By Daylight Loadout Builder!</h1>
      </div>
    </div>
  </div>
</template>

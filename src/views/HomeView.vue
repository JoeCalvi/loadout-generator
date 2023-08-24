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
    <div class="row m-auto justify-content-center">
      <div class="col-md-6 loadout-section d-flex flex-column justify-content-center align-items-center">
          <div class="row w-100 justify-content-center">
            <div class="col-md-2 d-flex justify-content-center">
              <div class="perk-icon-background perk-one"></div>
            </div>
          </div>
          <div class="row w-100 justify-content-center">
            <div class="col-md-2 d-flex justify-content-center me-3">
              <div class="perk-icon-background perk-two"></div>
            </div>
            <div class="col-md-2 d-flex justify-content-center ms-3">
              <div class="perk-icon-background perk-three"></div>
            </div>
          </div>
          <div class="row w-100 justify-content-center">
            <div class="col-md-2 d-flex justify-content-center">
              <div class="perk-icon-background perk-four"></div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loadout-section {
  height: 40vh;
}

.perk-one {

}

.perk-two {
  
}

.perk-three {
  
}

.perk-four {
  
}
</style>

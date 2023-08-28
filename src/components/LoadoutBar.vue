<script>
export default {
  props: {
    loadout: {
      type: Array,
      required: true
    }
  },
  data() {

    return {

    }
  }
}
</script>

<template>
        <div v-if="loadout.length > 0" class="row py-2 justify-content-center border border-white rounded border-opacity-50">
          <h4 class="text-center my-3">Your Loadout</h4>
          <div class="col-md-2 d-flex justify-content-center p-3 mb-3">
            <div class="perk-icon-background d-flex justify-content-center align-items-center">
              <img v-if="loadout[0]" class="perk-icon" :src="loadout[0].icon" :alt="loadout[0].name" :title="loadout[0].name">
            </div>
          </div>
          <div class="col-md-2 d-flex justify-content-center p-3 mb-3">
            <div class="perk-icon-background d-flex justify-content-center align-items-center">
              <img v-if="loadout[1]" class="perk-icon" :src="loadout[1].icon" :alt="loadout[1].name" :title="loadout[1].name">
            </div>
          </div>
          <div class="col-md-2 d-flex justify-content-center p-3 mb-3">
            <div class="perk-icon-background d-flex justify-content-center align-items-center">
              <img v-if="loadout[2]" class="perk-icon" :src="loadout[2].icon" :alt="loadout[2].name" :title="loadout[2].name">
            </div>
          </div>
          <div class="col-md-2 d-flex justify-content-center p-3 mb-3">
            <div class="perk-icon-background d-flex justify-content-center align-items-center">
              <img v-if="loadout[3]" class="perk-icon" :src="loadout[3].icon" :alt="loadout[3].name" :title="loadout[3].name">
            </div>
          </div>
        </div>
</template>
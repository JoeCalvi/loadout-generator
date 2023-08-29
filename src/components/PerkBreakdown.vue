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
    <div v-if="loadout.length > 0" class="row m-auto">
      <div class="col-12">
        <h4 class="text-center my-2 pt-3">Perk Breakdown</h4>
        <div class="row m-auto py-3 align-items-center">
          <div class="col-12 d-flex align-items-center justify-content-center">
            <div class="row w-100 m-auto py-4 justify-content-between align-items-center border border-white border-opacity-25 border-start-0 border-end-0">
              <div class="col-md-3 my-3 pb-3 d-flex justify-content-center align-items-center">
                <div class="perk-icon-background d-flex justify-content-center align-items-center">
                  <img v-if="loadout[0]" class="perk-icon" :src="loadout[0].icon" :alt="loadout[0].name" :title="loadout[0].name">
                </div>
              </div>
              <div class="col-md-9 mb-3 d-flex flex-column justify-content-center">
                <h5 v-if="loadout[0]" class="mb-0">{{ loadout[0].name }}</h5>
                <p v-if="loadout[0] && loadout[0].role == 'Survivor' && loadout[0].survivor"><span class="text-danger">{{ loadout[0].survivor.name }}</span> Perk</p>
                <p v-if="loadout[0] && loadout[0].role == 'Survivor' && !loadout[0].survivor">General Survivor Perk</p>
                <p v-if="loadout[0] && loadout[0].role == 'Killer' && loadout[0].killer"><span class="text-danger">{{ loadout[0].killer.killer_name }}</span> Perk</p>
                <p v-if="loadout[0] && loadout[0].role == 'Killer' && !loadout[0].killer">General Killer Perk</p>
                <i v-if="loadout[0]">{{ loadout[0].description }}</i>
              </div>
            </div>
          </div>
        </div>
        <div class="row m-auto py-3 align-items-center">
          <div class="col-12 d-flex align-items-center justify-content-center">
            <div class="row w-100 m-auto pb-4 justify-content-between align-items-center border-bottom border-white border-opacity-25">
              <div class="col-md-3 my-3 pb-3 d-flex justify-content-center align-items-center">
                <div class="perk-icon-background d-flex justify-content-center align-items-center">
                  <img v-if="loadout[1]" class="perk-icon" :src="loadout[1].icon" :alt="loadout[1].name" :title="loadout[1].name">
                </div>
              </div>
              <div class="col-md-9 mb-3 d-flex flex-column justify-content-center">
                <h5 v-if="loadout[1]" class="mb-0">{{ loadout[1].name }}</h5>
                <p v-if="loadout[1] && loadout[0].role == 'Survivor' && loadout[1].survivor"><span class="text-danger">{{ loadout[1].survivor.name }}</span> Perk</p>
                <p v-if="loadout[1] && loadout[0].role == 'Survivor' && !loadout[1].survivor">General Survivor Perk</p>
                <p v-if="loadout[1] && loadout[1].role == 'Killer' && loadout[1].killer"><span class="text-danger">{{ loadout[1].killer.killer_name }}</span> Perk</p>
                <p v-if="loadout[1] && loadout[1].role == 'Killer' && !loadout[1].killer">General Killer Perk</p>
                <i v-if="loadout[1]">{{ loadout[1].description }}</i>
              </div>
            </div>
          </div>
        </div>
        <div class="row m-auto py-3 align-items-center">
          <div class="col-12 d-flex align-items-center justify-content-center">
            <div class="row w-100 m-auto pb-4 justify-content-between align-items-center border-bottom border-white border-opacity-25">
              <div class="col-md-3 my-3 pb-3 d-flex justify-content-center align-items-center">
                <div class="perk-icon-background d-flex justify-content-center align-items-center">
                  <img v-if="loadout[2]" class="perk-icon" :src="loadout[2].icon" :alt="loadout[2].name" :title="loadout[2].name">
                </div>
              </div>
              <div class="col-md-9 mb-3 d-flex flex-column justify-content-center">
                <h5 v-if="loadout[2]" class="mb-0">{{ loadout[2].name }}</h5>
                <p v-if="loadout[2] && loadout[0].role == 'Survivor' && loadout[2].survivor"><span class="text-danger">{{ loadout[2].survivor.name }}</span> Perk</p>
                <p v-if="loadout[2] && loadout[0].role == 'Survivor' && !loadout[2].survivor">General Survivor Perk</p>
                <p v-if="loadout[2] && loadout[2].role == 'Killer' && loadout[2].killer"><span class="text-danger">{{ loadout[2].killer.killer_name }}</span> Perk</p>
                <p v-if="loadout[2] && loadout[2].role == 'Killer' && !loadout[2].killer">General Killer Perk</p>
                <i v-if="loadout[2]">{{ loadout[2].description }}</i>
              </div>
            </div>
          </div>
        </div>
        <div class="row m-auto py-3 align-items-center">
          <div class="col-12 d-flex align-items-center justify-content-center">
            <div class="row w-100 m-auto pb-4 justify-content-between align-items-center border-bottom border-white border-opacity-25">
              <div class="col-md-3 my-3 pb-3 d-flex justify-content-center align-items-center">
                <div class="perk-icon-background d-flex justify-content-center align-items-center">
                  <img v-if="loadout[3]" class="perk-icon" :src="loadout[3].icon" :alt="loadout[3].name" :title="loadout[3].name">
                </div>
              </div>
              <div class="col-md-9 mb-3 d-flex flex-column justify-content-center">
                <h5 v-if="loadout[3]" class="mb-0">{{ loadout[3].name }}</h5>
                <p v-if="loadout[3] && loadout[0].role == 'Survivor' && loadout[3].survivor"><span class="text-danger">{{ loadout[3].survivor.name }}</span> Perk</p>
                <p v-if="loadout[3] && loadout[0].role == 'Survivor' && !loadout[3].survivor">General Survivor Perk</p>
                <p v-if="loadout[3] && loadout[3].role == 'Killer' && loadout[3].killer"><span class="text-danger">{{ loadout[3].killer.killer_name }}</span> Perk</p>
                <p v-if="loadout[3] && loadout[3].role == 'Killer' && !loadout[3].killer">General Killer Perk</p>
                <i v-if="loadout[3]">{{ loadout[3].description }}</i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
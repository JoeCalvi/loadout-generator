<script>
export default {
  props: {
    perk: {
      type: Object,
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
    <div class="col-md-3 my-3 pb-3 d-flex justify-content-center align-items-center">
      <div class="perk-icon-background d-flex justify-content-center align-items-center">
        <img class="perk-icon" :src="perk.icon" :alt="perk.name" :title="perk.name">
      </div>
    </div>
    <div class="col-md-9 mb-3 d-flex flex-column justify-content-center">
      <h5 class="mb-0">{{ perk.name }}</h5>
      <i>{{ perk.description }}</i>
    </div>
</template>
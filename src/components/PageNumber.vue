<script>
import { AppState } from "../AppState";
import { computed } from "vue"

export default {
  props: {
    pageNumber: {
      type: Number,
      required: true
    }
  },
  data() {

    return {
      chosenPage: computed(() => AppState.pageNumber)
    }
  }
}
</script>

<template>
  <div class="d-flex align-items-center justify-content-center">
      <span v-if="pageNumber == chosenPage" class="selectable text-decoration-underline text-danger">{{ pageNumber }}</span>
      <span v-else class="selectable">{{ pageNumber }}</span>
  </div>
</template>
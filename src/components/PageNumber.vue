<script>
export default {
  props: {
    pageNumber: {
      type: Number,
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
  <div class="d-flex align-items-center justify-content-center">
      <span class="selectable">{{ pageNumber }}</span>
  </div>
</template>
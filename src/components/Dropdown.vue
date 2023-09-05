<script>
import { computed } from 'vue';
import { AppState } from '../AppState';

export default {
  data() {

    return {
        survivorOnly: computed(() => AppState.survivorPerksOnly),
        killerOnly: computed(() => AppState.killerPerksOnly),
        survivors: computed(() => AppState.survivors),
        killers: computed(() => AppState.killers),
    }
  }
}
</script>

<template>
    <div class="dropdown-center">
        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Exclude
        </button>
        <ul class="dropdown-menu container">
            <li v-if="survivorOnly" class="row m-auto align-items-center border-bottom border-dark border-opacity-25" v-for="survivor in survivors">
                <div class="col-1">
                    <input class="me-2" type="checkbox" value="" id="flexCheckDefault">
                </div>
                <div class="col-10 py-2 text-center">
                    <label class="form-check-label" for="flexCheckDefault">
                        {{ survivor.name }}
                    </label>
                </div>
            </li>
            <li v-if="killerOnly" class="row m-auto align-items-center border-bottom border-dark border-opacity-25" v-for="killer in killers">
                <div class="col-1">
                    <input class="me-2" type="checkbox" value="" id="flexCheckDefault">
                </div>
                <div class="col-10 py-2 text-center">
                    <label class="form-check-label" for="flexCheckDefault">
                        {{ killer.killer_name }}
                    </label>
                </div>
            </li>
        </ul>
    </div>
</template>

<style scoped>

.dropdown-menu {
    max-height: 50vh;
    overflow-y: auto;
}
</style>
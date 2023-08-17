<script>
import { computed, onMounted } from "vue";
import { api } from "../Axios";
import { AppState } from "../AppState"
import { Perk } from "../models/Perk"

export default {
  data() {
    async function getAllKillers () {
        try {
          const res = await api.get('killers')
          AppState.killers = res.data;
          console.log(AppState.killers);
        } catch (error) {
          console.error(error);
        }
      }

    async function getAllPerks () {
      try {
        const res = await api.get('perks');
        AppState.perks = res.data.map(p => new Perk(p));
        console.log(AppState.perks)
      } catch (error) {
        console.error(error)
      }
    }

    onMounted(() => {
      getAllPerks();
    })
    return {
      perks: computed(() => AppState.perks)
      
    }
  }
}
</script>

<template>
<div class="container-fluid">
  <div class="row m-auto">
    <div class="col-12 d-flex flex-column justify-content-center">
    </div>
  </div>
</div>
</template>

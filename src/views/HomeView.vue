<script>
import { computed, onMounted } from "vue";
import { api } from "../Axios";
import { AppState } from "../AppState"
import { Perk } from "../models/Perk"
import { Killer } from "../models/Killer"
import { Survivor } from "../models/Survivor";

export default {
  data() {
    async function getAllKillers () {
        try {
          const res = await api.get('killers')
          AppState.killers = res.data.map(k => new Killer(k));
          console.log(AppState.killers);
        } catch (error) {
          console.error(error);
        }
      }

    async function getAllSurvivors () {
      try {
        const res = await api.get('survivors');
        AppState.survivors = res.data.map(s => new Survivor(s));
        console.log(AppState.survivors)
      } catch (error) {
        console.error(error)
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
      getAllSurvivors();
    })

    return {
      perks: computed(() => AppState.perks),
      killers: computed(() => AppState.killers),
      survivors: computed(() => AppState.survivors)
      
    }
  }
}
</script>

<template>
<div class="container-fluid">
  <div class="row m-auto">
    <div class="col-12 d-flex flex-column justify-content-center">
      <div class="row m-auto">
        <div class="col-3 d-flex justify-content-center align-items-center" v-for="survivor in survivors">
            <img :src="survivor.portrait" alt="">
        </div>
      </div>
    </div>
  </div>
</div>
</template>

import { reactive } from "vue";

export const AppState = reactive({
  perks: [],
  activePerk: null,
  killers: [],
  survivors: [],
  activeSurvivor: null,
  statusEffects: [], 
  pageNumber: 1,
  survivorPerksOnly: false,
  killerPerksOnly: false
})
import { reactive } from "vue";

export const AppState = reactive({
  perks: [],
  activePerk: null,
  killers: [],
  survivors: [], 
  pageNumber: 1,
  survivorPerksOnly: false,
  killerPerksOnly: false
})
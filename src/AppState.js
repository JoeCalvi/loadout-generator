import { reactive } from "vue";

export const AppState = reactive({
  loadout: [],
  perks: [],
  activePerk: null,
  killers: [],
  activeKiller: null,
  randomKiller: null,
  survivors: [],
  activeSurvivor: null,
  randomSurvivor: null,
  statusEffects: [],
  pageNumber: 1,
  survivorPerksOnly: false,
  killerPerksOnly: false
})
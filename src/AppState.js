import { reactive } from "vue";

export const AppState = reactive({
  perks: [],
  killers: [],
  survivors: [], 
  pageNumber: 1
})
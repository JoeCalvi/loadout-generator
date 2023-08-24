import { api } from "../Axios";
import { StatusEffect } from "../models/StatusEffect";
import { AppState } from "../AppState";

class StatusEffectsService {
  async getAllStatusEffects() {
    try {
      const res = await api.get('status_effects')
      AppState.statusEffects = res.data.map(e => new StatusEffect(e))
      // console.log(AppState.statusEffects)
    } catch (error) {
      console.error(error)
    }
  }
}

export const statusEffectsService = new StatusEffectsService();
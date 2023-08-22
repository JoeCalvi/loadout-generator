import { api } from "../Axios";
import { AppState } from "../AppState";
import { Perk } from "../models/Perk";

class PerksService {
  async getAllPerks () {
    try {
      const res = await api.get('perks');
      console.log(res.data.perks)
      // AppState.perks = res.data.map(p => new Perk(p));
      // console.log(AppState.perks)
    } catch (error) {
      console.error(error)
    }
  }
}

export const perksService = new PerksService();
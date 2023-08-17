import { api } from "../Axios";
import { AppState } from "../AppState";
import { Killer } from "../models/Killer";

class KillersService {
  async getAllKillers () {
    try {
      const res = await api.get('killers')
      AppState.killers = res.data.map(k => new Killer(k));
      console.log(AppState.killers);
    } catch (error) {
      console.error(error);
    }
  }
}

export const killersService = new KillersService();
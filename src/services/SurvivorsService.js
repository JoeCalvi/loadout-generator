import { api } from "../Axios";
import { AppState } from "../AppState";
import { Survivor } from "../models/Survivor";

class SurvivorsService {
  async getAllSurvivors () {
    try {
      const res = await api.get('survivors');
      AppState.survivors = res.data.map(s => new Survivor(s));
      console.log(AppState.survivors)
    } catch (error) {
      console.error(error)
    }
  }
}

export const survivorsService = new SurvivorsService();
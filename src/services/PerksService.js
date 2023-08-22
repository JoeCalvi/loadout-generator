import { api } from "../Axios";
import { AppState } from "../AppState";
import { Perk } from "../models/Perk";

class PerksService {
  async getAllPerks () {
    try {
      if (AppState.pageNumber == 1) {
        const res = await api.get('perks?page=1');
        AppState.perks = res.data.perks.map(p => new Perk(p));
        // console.log(AppState.perks)
      } else if (AppState.pageNumber == 2) {
        const res = await api.get('perks?page=2');
        AppState.perks = res.data.perks.map(p => new Perk(p));
        // console.log(AppState.perks)
      } else if (AppState.pageNumber == 3) {
        const res = await api.get('perks?page=3');
        AppState.perks = res.data.perks.map(p => new Perk(p));
        // console.log(AppState.perks)
      } else if (AppState.pageNumber == 4) {
        const res = await api.get('perks?page=4');
        AppState.perks = res.data.perks.map(p => new Perk(p));
        // console.log(AppState.perks)
      } else if (AppState.pageNumber == 5) {
        const res = await api.get('perks?page=5');
        AppState.perks = res.data.perks.map(p => new Perk(p));
        // console.log(AppState.perks)
      } else if (AppState.pageNumber == 6) {
        const res = await api.get('perks?page=6');
        AppState.perks = res.data.perks.map(p => new Perk(p));
        // console.log(AppState.perks)
      } else if (AppState.pageNumber == 7) {
        const res = await api.get('perks?page=7');
        AppState.perks = res.data.perks.map(p => new Perk(p));
        // console.log(AppState.perks)
      } else if (AppState.pageNumber == 8) {
        const res = await api.get('perks?page=8');
        AppState.perks = res.data.perks.map(p => new Perk(p));
        // console.log(AppState.perks)
      } else if (AppState.pageNumber == 9) {
        const res = await api.get('perks?page=9');
        AppState.perks = res.data.perks.map(p => new Perk(p));
        // console.log(AppState.perks)
      }
    } catch (error) {
      console.error(error)
    }
  }

  async getAllSurvivorPerks() {
    try {
      if (AppState.pageNumber == 1) {
        const res = await api.get('perks/survivor?page=1');
        AppState.perks = res.data.perks.map(p => new Perk(p));
        // console.log(AppState.perks)
      } else if (AppState.pageNumber == 2) {
        const res = await api.get('perks/survivor?page=2');
        AppState.perks = res.data.perks.map(p => new Perk(p));
        // console.log(AppState.perks)
      } else if (AppState.pageNumber == 3) {
        const res = await api.get('perks/survivor?page=3');
        AppState.perks = res.data.perks.map(p => new Perk(p));
        // console.log(AppState.perks)
      } else if (AppState.pageNumber == 4) {
        const res = await api.get('perks/survivor?page=4');
        AppState.perks = res.data.perks.map(p => new Perk(p));
        // console.log(AppState.perks)
      } else if (AppState.pageNumber == 5) {
        const res = await api.get('perks/survivor?page=5');
        AppState.perks = res.data.perks.map(p => new Perk(p));
        // console.log(AppState.perks)
      }
    } catch (error) {
      console.error(error)
    }
  }

  async getAllKillerPerks() {
    try {
      if (AppState.pageNumber == 1) {
        const res = await api.get('perks/killer?page=1');
        AppState.perks = res.data.perks.map(p => new Perk(p));
        // console.log(AppState.perks)
      } else if (AppState.pageNumber == 2) {
        const res = await api.get('perks/killer?page=2');
        AppState.perks = res.data.perks.map(p => new Perk(p));
        // console.log(AppState.perks)
      } else if (AppState.pageNumber == 3) {
        const res = await api.get('perks/killer?page=3');
        AppState.perks = res.data.perks.map(p => new Perk(p));
        // console.log(AppState.perks)
      } else if (AppState.pageNumber == 4) {
        const res = await api.get('perks/killer?page=4');
        AppState.perks = res.data.perks.map(p => new Perk(p));
        // console.log(AppState.perks)
      }
    } catch (error) {
      console.error(error)
    }
  }

  async getAllGenericPerks() {
    try {
      const res = await api.get('perks/generic');
      AppState.perks = res.data.map(p => new Perk(p));
      // console.log(AppState.perks)
    } catch (error) {
      console.error(error)
    }
  }

  async getAllGenericSurvivorPerks() {
    try {
      const res = await api.get('perks/survivor/generic');
      AppState.perks = res.data.map(p => new Perk(p));
      // console.log(AppState.perks);
    } catch (error) {
      console.error(error)
    }
  }

  async getAllGenericKillerPerks() {
    try {
      const res = await api.get('perks/killer/generic');
      AppState.perks = res.data.map(p => new Perk(p));
      console.log(AppState.perks);
    } catch (error) {
      console.error(error)
    }
  }
}

export const perksService = new PerksService();
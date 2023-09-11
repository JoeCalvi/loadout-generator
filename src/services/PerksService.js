import { api } from "../Axios";
import { AppState } from "../AppState";
import { Perk } from "../models/Perk";
class PerksService {
  async getPageFromAllPerks (pageNumber) {
    try {
      const res = await api.get(`perks?page=${pageNumber}`)
      AppState.perks = res.data.perks.map(p => new Perk(p))
      // console.log("perks:", AppState.perks)
    } catch (error) {
      console.error(error)
    }
  }

  async getPageFromSurvivorPerks(pageNumber) {
    try {
        const res = await api.get(`perks/survivor?page=${pageNumber}`);
        AppState.perks = res.data.perks.map(p => new Perk(p));
        // console.log(AppState.perks)
    } catch (error) {
      console.error(error)
    }
  }

  async getPageFromKillerPerks(pageNumber) {
    try {
        const res = await api.get(`perks/killer?page=${pageNumber}`);
        AppState.perks = res.data.perks.map(p => new Perk(p));
        // console.log(AppState.perks)
    } catch (error) {
      console.error(error)
    }
  }

  async getAllPerks(role) {
    try {
      AppState.perks = [];
      AppState.pages = [];

      if (role == "Survivor") {
        AppState.pages = [1, 2, 3, 4, 5]
        for (let i = 0; i < AppState.pages.length; i++) {
          const res = await api.get(`perks/survivor?page=${AppState.pages[i]}`);
          const perks = res.data.perks.map(p => new Perk(p))
          for (let j = 0; j < perks.length; j++) {
            AppState.perks.push(perks[j])
          }
        }
      } else if (role == "Killer") {
        AppState.pages = [1, 2, 3, 4]
        for (let i = 0; i < AppState.pages.length; i++) {
          const res = await api.get(`perks/killer?page=${AppState.pages[i]}`);
          const perks = res.data.perks.map(p => new Perk(p))
          for (let j = 0; j < perks.length; j++) {
            AppState.perks.push(perks[j])
          }
        }
      }

      console.log("ALL PERKS:", AppState.perks);
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

  async getPerkById(perkId) {
    try {
      const res = await api.get(`perks/${perkId}`)
      AppState.activePerk = new Perk(res.data)

      if (AppState.activePerk.associated_status_effects.length > 0) {
        AppState.activePerk.associated_status_effects.forEach(e => {
          const googleDriveURL = e.icon;
          const fileId = googleDriveURL.slice(32, 65)
          const iconLink = `https://drive.google.com/uc?id=${fileId}`
          e.icon = iconLink
        });
      }
      
      console.log(AppState.activePerk)
    } catch (error) {
      console.error(error)
    }
  }
}

export const perksService = new PerksService();
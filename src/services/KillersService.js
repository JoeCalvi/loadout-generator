import { api } from "../Axios";
import { AppState } from "../AppState";
import { Killer } from "../models/Killer";

class KillersService {
  async getAllKillers () {
    try {
      const res = await api.get('killers')
      AppState.killers = res.data.map(k => new Killer(k));
      // console.log(AppState.killers);
    } catch (error) {
      console.error(error);
    }
  }

  async getKillerById(killerId) {
    try {
      const res = await api.get(`killers/${killerId}`);
      AppState.activeKiller = new Killer(res.data);

      const perkOneDriveURL = AppState.activeKiller.perk_one.icon;
      const perkOneFileId = perkOneDriveURL.slice(32, 65);
      const perkOneIconLink = `https://drive.google.com/uc?id=${perkOneFileId}`;
      AppState.activeKiller.perk_one.icon = perkOneIconLink;

      const perkTwoDriveURL = AppState.activeKiller.perk_two.icon;
      const perkTwoFileId = perkTwoDriveURL.slice(32, 65);
      const perkTwoIconLink = `https://drive.google.com/uc?id=${perkTwoFileId}`;
      AppState.activeKiller.perk_two.icon = perkTwoIconLink;

      const perkThreeDriveURL = AppState.activeKiller.perk_three.icon;
      const perkThreeFileId = perkThreeDriveURL.slice(32, 65);
      const perkThreeIconLink = `https://drive.google.com/uc?id=${perkThreeFileId}`;
      AppState.activeKiller.perk_three.icon = perkThreeIconLink;

      console.log(AppState.activeKiller)
    } catch (error) {
      console.error(error)
    }
  }
}

export const killersService = new KillersService();
import { api } from "../Axios";
import { AppState } from "../AppState";
import { Survivor } from "../models/Survivor";

class SurvivorsService {
  async getAllSurvivors () {
    try {
      const res = await api.get('survivors');
      AppState.survivors = res.data.map(s => new Survivor(s));
      // console.log(AppState.survivors)
    } catch (error) {
      console.error(error)
    }
  }

  async getSurvivorById(survivorId) {
    try {
      const res = await api.get(`survivors/${survivorId}`);
      AppState.activeSurvivor = new Survivor(res.data);

      const perkOneDriveURL = AppState.activeSurvivor.perk_one.icon;
      const perkOneFileId = perkOneDriveURL.slice(32, 65);
      const perkOneIconLink = `https://drive.google.com/uc?id=${perkOneFileId}`;
      AppState.activeSurvivor.perk_one.icon = perkOneIconLink;

      const perkTwoDriveURL = AppState.activeSurvivor.perk_two.icon;
      const perkTwoFileId = perkTwoDriveURL.slice(32, 65);
      const perkTwoIconLink = `https://drive.google.com/uc?id=${perkTwoFileId}`;
      AppState.activeSurvivor.perk_two.icon = perkTwoIconLink;

      const perkThreeDriveURL = AppState.activeSurvivor.perk_three.icon;
      const perkThreeFileId = perkThreeDriveURL.slice(32, 65);
      const perkThreeIconLink = `https://drive.google.com/uc?id=${perkThreeFileId}`;
      AppState.activeSurvivor.perk_three.icon = perkThreeIconLink;

      console.log(AppState.activeSurvivor)
    } catch (error) {
      console.error(error)
    }
  }
}

export const survivorsService = new SurvivorsService();
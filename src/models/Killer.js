export class Killer {
  constructor(data) {
    this.id = data._id;
    this.killer_name = data.killer_name;
    this.original_name = data.original_name;
    this.difficulty_rating = data.difficulty_rating;
    this.height = data.height;
    this.movement_speed = data.movement_speed;
    this.overview = data.overview;
    this.gender = data.gender;
    this.description = data.description;
    this.portrait = handlePortraitURL(data);
    this.chapter = data.chapter;
    this.chapter_id = data.chapter_id;
    this.perk_one = data.perk_one;
    this.perk_one_id = data.perk_one_id;
    this.perk_two = data.perk_two;
    this.perk_two_id = data.perk_two_id;
    this.perk_three = data.perk_three;
    this.perk_three_id = data.perk_three_id;
    this.power = data.power;
    this.power_id = data.power_id;
    this.realm = data.realm;
    this.realm_id = data.realm_id;
    this.terror_radius = data.terror_radius;
    this.voice_actor = data.voice_actor;
    this.weapon = data.weapon;
    this.weapon_id = data.weapon_id;
  }
}

function handlePortraitURL (data) {
  if (!data) {
    return null;
  }

  const googleDriveURL = data.portrait;
  const fileId = googleDriveURL.slice(32, 65)
  const portraitLink = `https://drive.google.com/uc?id=${fileId}`

  return portraitLink;
}
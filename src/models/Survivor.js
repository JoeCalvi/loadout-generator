export class Survivor {
  constructor(data) {
    this.id = data._id;
    this.name = data.name;
    this.role = data.role;
    this.overview = data.overview;
    this.gender = data.gender;
    this.portrait = handlePortraitURL(data);
    this.chapter = data.chapter;
    this.chapter_id = data.chapter_id;
    this.perk_one = data.perk_one;
    this.perk_one_id = data.perk_one_id;
    this.perk_two = data.perk_two;
    this.perk_two_id = data.perk_two_id;
    this.perk_three = data.perk_three;
    this.perk_three_id = data.perk_three_id;
    this.voice_actor = data.voice_actor;
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
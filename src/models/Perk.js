export class Perk {
  constructor(data) {
    this.id = data._id;
    this.role = data.role;
    this.name = data.name;
    this.description = data.description;
    this.icon = handleIconURL(data);
    this.chapter = data.chapter;
    this.chapter_id = data.chapter_id;
    this.generic = data.generic;
    this.killer = data.killer;
    this.killer_id = data.killer_id;
    this.survivor = data.survivor;
    this.survivor_id = data.survivor_id;
  }
}

function handleIconURL (data) {
  if (!data) {
    return null;
  }

  const googleDriveURL = data.icon;
  const fileId = googleDriveURL.slice(32, 65)
  const iconLink = `https://drive.google.com/uc?id=${fileId}`

  return iconLink;
}
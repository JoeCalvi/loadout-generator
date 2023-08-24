export class StatusEffect {
  constructor(data) {
    this.id = data._id;
    this.applies_to = data.applies_to;
    this.name = data.name;
    this.type = data.type;
    this.description = data.description;
    this.icon = handleIconURL(data);
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

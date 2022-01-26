export class Matiere {

  constructor(id: string, libelle: string, picLink: string) {
    this._id = id;
    this.libelle = libelle;
    this.picLink = picLink;
  }

  _id: string;
  libelle: string;
  picLink: string;
}

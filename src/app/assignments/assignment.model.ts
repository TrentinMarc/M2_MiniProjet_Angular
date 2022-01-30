export class Assignment {
  nom!:string;
  dateDeRendu!:string;
  rendu!:boolean;
  note?: number | null;
  matiere: string | undefined;
  auteur?: string;
  _id?:string | null;
  remarques!:string;


  constructor(nom: string, dateDeRendu: string, rendu: boolean, matiere: string | undefined, auteur: string, id: string | null, remarques: string, note: number | null) {
    this.nom = nom;
    this.dateDeRendu = dateDeRendu;
    this.rendu = rendu;
    this.matiere = matiere;
    this.auteur = auteur;
    this._id = id;
    this.remarques = remarques;
    this.note = note;
  }
}

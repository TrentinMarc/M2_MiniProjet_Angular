export class Assignment {
  nom!:string;
  dateDeRendu!:string;
  rendu!:boolean;
  matiere: string | undefined;
  auteur?: string;
  _id?:string;
}

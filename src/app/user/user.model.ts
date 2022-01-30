export class User {
  constructor(_id: string, email: string, nom: string, prenom: string, mdp: string) {
    this.email = email;
    this.nom = nom;
    this.prenom = prenom;
    this.mdp = mdp;
    this._id = _id;
  }

  _id: string;
  email: string;
  nom: string;
  prenom: string;
  mdp: string;
}

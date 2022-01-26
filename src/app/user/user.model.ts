export class User {


  constructor(email: string, nom: string, prenom: string, mdp: string) {
    this.email = email;
    this.nom = nom;
    this.prenom = prenom;
    this.mdp = mdp;
  }

  email: string;
  nom: string;
  prenom: string;
  mdp: string;
}

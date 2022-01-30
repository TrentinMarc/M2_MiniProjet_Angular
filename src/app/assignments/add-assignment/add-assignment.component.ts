import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { MatieresService } from "../../shared/matiere.service";
import { Assignment } from '../assignment.model';
import {Observable} from "rxjs";
import {Matiere} from "../../matiere/matiere.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../user/user.model";
import {UserService} from "../../user/user.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {

  // associées au champs input du formulaire
  private _nomDevoir = "";
  private _nomAuteur = "";
  private _dateDeRendu!:Date;
  private _matieres!: Observable<Matiere[]>;
  private _auteurs!: Observable<User[]>;
  private _commentaire="";
  private assignment!: Assignment;
  private _addForm: FormGroup = this.fb.group({
    nom: [null, Validators.required],
    dateDeRendu: [null, Validators.required],
    matiere: [null, Validators.required],
    auteur: [null, Validators.required],
    remarques: [null, Validators.required]
  })

  constructor(private assignmentService:AssignmentsService, private toastr: ToastrService,
    private router:Router, private matieresService: MatieresService, private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this._matieres = this.matieresService.getMatieres();
    this._auteurs = this.userService.getUsers();
  }

  onSubmit() {
    if(this._addForm.valid){
      this.assignment = new Assignment(this._addForm.value.nom,
        new Date(this._addForm.value.dateDeRendu).toISOString(),
        false,  this._addForm.value.matiere,
        this._addForm.value.auteur,
        null,
        this._addForm.value.remarques,
        null);
      this.assignmentService.addAssignment(this.assignment)
        .subscribe(
          response => {
            console.log(response)
            this.toastr.success(`Assignment ajouté`, "Succès", {
              progressBar: true,
              positionClass: 'toast-top-center'
            });
            this.router.navigate(['/home'])
          },
          err => {
            this.toastr.error("Une erreur est survenu lors de l'ajout", 'Erreur...', {
              progressBar: true,
              positionClass: 'toast-top-center'
            });
          });
    }
    // console.log("NOM = " + this.nomDevoir);
    // console.log("DATE = " + this.dateDeRendu);
    //
    // const newAssignment = new Assignment();
    // newAssignment.id = Math.round(Math.random()*100000);
    // newAssignment.nom = this.nomDevoir;
    // newAssignment.dateDeRendu = this.dateDeRendu;
    // newAssignment.rendu = false;
    //
    // this.assignmentService.addAssignment(newAssignment)
    // .subscribe(reponse => {
    //   console.log(reponse.message);
    //   // maintenant il faut qu'on affiche la liste !!!
    //   this.router.navigate(["/home"]);
    // });
  }


  get nomDevoir(): string {
    return this._nomDevoir;
  }

  get nomAuteur(): string {
    return this._nomAuteur;
  }

  get dateDeRendu(): Date {
    return this._dateDeRendu;
  }

  get matieres(): Observable<Matiere[]> {
    return this._matieres;
  }

  get auteurs(): Observable<User[]> {
    return this._auteurs;
  }

  get commentaire(): string {
    return this._commentaire;
  }

  get addForm(): FormGroup {
    return this._addForm;
  }


  set nomDevoir(value: string) {
    this._nomDevoir = value;
  }

  set nomAuteur(value: string) {
    this._nomAuteur = value;
  }

  set dateDeRendu(value: Date) {
    this._dateDeRendu = value;
  }

  set matieres(value: Observable<Matiere[]>) {
    this._matieres = value;
  }

  set auteurs(value: Observable<User[]>) {
    this._auteurs = value;
  }

  set commentaire(value: string) {
    this._commentaire = value;
  }

  set addForm(value: FormGroup) {
    this._addForm = value;
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { MatieresService } from "../../shared/matiere.service";
import { Assignment } from '../assignment.model';
import {Observable} from "rxjs";
import {Matiere} from "../../matiere/matiere.model";

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {

  // associées au champs input du formulaire
  nomDevoir = "";
  dateDeRendu!:Date;
  matieres!: Observable<Matiere[]>;

  constructor(private assignmentService:AssignmentsService,
    private router:Router, private matieresService: MatieresService) { }

  ngOnInit(): void {
    this.matieres = this.matieresService.getMatieres();
  }

  onSubmit() {
    console.log(this.matieres)
    this.matieres.forEach(m => console.log(m))
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
}

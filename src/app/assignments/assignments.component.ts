import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';
import {Observable} from "rxjs";
import {Matiere} from "../matiere/matiere.model";
import {UserService} from "../user/user.service";
import {MatieresService} from "../shared/matiere.service";
import {User} from "../user/user.model";

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  ajoutActive = false;
  assignments: Assignment[] = [];
  matieres: Matiere[] = [];
  users: User[] = [];
  matiereLibelles = {};
  auteurLibelles: string[] = [];
  // pour la pagination
  page: number = 1;
  limit: number = 10;
  totalDocs: number = 0;
  totalPages: number = 0;
  hasPrevPage: boolean = false;
  prevPage: number = 0;
  hasNextPage: boolean = false;
  nextPage: number = 0;
  displayedColumns: string[] = ['Matière', 'Date de rendu', 'weight', 'symbol'];

  constructor(private assignmentService: AssignmentsService, private userService: UserService, private matiereService: MatieresService) {}

  async ngOnInit(){
    this.assignmentService.getAssignments().subscribe(data =>{
      this.assignments = data;
    });

    this.matiereService.getMatieres().subscribe(data => {
      this.matieres = data;
      console.log(this.matieres)
      this.matieres.forEach(e => {
        // @ts-ignore
        this.matiereLibelles[e._id] = e.libelle;
      })
      // @ts-ignore
      console.log(this.matiereLibelles["61ed187d3519147a61a4b2a2"])
    });

    this.userService.getUsers().subscribe(data => {
      this.users = data;
      console.log(data)
    })
  }

  getAssignments() {
    this.assignmentService.getAssignmentsPagine(this.page, this.limit).subscribe((data) => {
      // le tableau des assignments est maintenant ici....
      this.assignments = data.docs;
      this.page = data.page;
      this.limit = data.limit;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.hasPrevPage = data.hasPrevPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.nextPage = data.nextPage;
    });
  }

  getColor(a: any) {
    return a.rendu ? 'green' : 'red';
  }

  // pagination
  premierePage() {
    this.page = 1;
    this.getAssignments();
  }

  dernierePage() {
    this.page = this.totalPages;
    this.getAssignments();
  }

  pagePrecedente() {
      this.page = this.prevPage;
      this.getAssignments();
  }

  pageSuivante() {
      this.page = this.nextPage;
      this.getAssignments();
  }

  changeLimit() {
    this.getAssignments();
  }
}

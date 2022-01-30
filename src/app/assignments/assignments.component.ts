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
  hasNextPage: boolean = true;
  nextPage: number = 0;
  size: number = 0;
  nbDisplayed: number = 0;
  displayedColumns: string[] = ['Matière', 'Date de rendu', 'Auteur', 'Remarques', 'Rendu', 'Note'];

  constructor(private assignmentService: AssignmentsService, private userService: UserService, private matiereService: MatieresService) {}

  async ngOnInit(){

    this.matiereService.getMatieres().subscribe(data => {
      this.matieres = data;
      this.matieres.forEach(e => {
        // @ts-ignore
        this.matiereLibelles[e._id] = e.libelle;
      })
    });


    this.userService.getUsers().subscribe(data => {
      this.users = data;
      this.users.forEach(e => {
        // @ts-ignore
        this.auteurLibelles[e._id] = e.nom;
      })
    });
    this.assignmentService.getSize()
      .subscribe(data => {
        this.size = Number(data)
        this.nbDisplayed = this.limit * this.page;
        this.totalPages = Math.floor(this.size / this.nbDisplayed)
        console.log(this.page)
      });



    this.getAssignments()
    // this.assignmentService.getAssignments(this.limit.toString(), this.page.toString()).subscribe(data =>{
    //   this.assignments = data;
    //   this.assignments.forEach(assignment => {
    //     var mat = assignment.matiere;
    //     var auteur = assignment.auteur;
    //     // @ts-ignore
    //     assignment.matiere = this.matiereLibelles[mat];
    //     // @ts-ignore
    //     assignment.auteur = this.auteurLibelles[auteur];
    //   })
    //   console.log(this.assignments)
    // });

  }
  getPageSizeOptions(): number[] {
    if (this.assignments.length> 100){
      return [20, 50, this.assignments.length];
    }else{
      return [20, 50, 100];
    }
  }
  getAssignments() {
    this.assignmentService.getAssignments(this.limit.toString(), this.page.toString()).subscribe(data =>{
      this.assignments = data;
      this.assignments.forEach(assignment => {
        var mat = assignment.matiere;
        var auteur = assignment.auteur;
        // @ts-ignore
        assignment.matiere = this.matiereLibelles[mat];
        // @ts-ignore
        assignment.auteur = this.auteurLibelles[auteur];
      })
      this.nbDisplayed = this.limit * this.page;
      this.totalPages = Math.floor(this.size / this.limit)
      if(this.page > this.totalPages){
        this.page = this.totalPages
      }
    });


  }

  getColor(a: any) {
    return a.rendu ? 'green' : 'red';
  }

  // pagination
  premierePage() {
    this.page = 1;
    this.hasPrevPage = false;
    this.hasNextPage = true;
    this.getAssignments();
  }

  dernierePage() {
    this.page = this.totalPages;
    this.hasPrevPage = true;
    this.hasNextPage = false;
    this.getAssignments();
  }

  pagePrecedente() {
      if(this.page > 1){
        this.getAssignments();
        this.page--
        this.hasNextPage = true;
      }
      if(this.page == 1){
        this.hasPrevPage = false
      }

  }

  pageSuivante() {
      // this.page = this.nextPage;
    if(this.page < this.totalPages){
      this.page++
      this.hasPrevPage = true;
    }
    if(this.page == this.totalPages){
      this.hasNextPage = false;
    }
      this.getAssignments();
  }

  changeLimit() {
    this.getAssignments();
  }
}

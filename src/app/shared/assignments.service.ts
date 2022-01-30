import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { Assignment } from '../assignments/assignment.model';
import { LoggingService } from './logging.service';
import { bdInitialAssignments } from './data';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})

export class AssignmentsService {
  assignments:Assignment[] = [];

  constructor(private loggingService:LoggingService,
              private http:HttpClient, private authService: AuthService) { }

  //url = "http://localhost:8010/api/assignments";
  // url = "https://api-intense2022.herokuapp.com/api/assignments";
  // url = "http://localhost:8080/api/assignment/"
  url="https://miniprojetbackend.herokuapp.com/api/assignment/"
  getAssignments(limit: string, page: string):Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.url+'all/' + limit + "/" +page, this.authService.getHeader());
  }

  getAssignmentsPagine(page:number, limit:number):Observable<any> {
    return this.http.get<any>(`${this.url}?page=${page}&limit=${limit}`);
  }

  getAssignment(id:string):Observable<Assignment|undefined> {
    //let assignment = this.assignments.find(elem => elem.id === id);

    //return of(assignment);

    return this.http.get<Assignment>(this.url + id);
  }

  addAssignment(assignment:Assignment):Observable<any>{
    return this.http.post<Assignment>(this.url, assignment);
  }

  updateAssignment(assignment:Assignment):Observable<any> {
    // pour le moment rien de spécial à faire
    // mais plus tard -> requête PUT sur un web service
    // pour mettre à jour une BD distante...

    //return of(`Assignment ${assignment.nom} modifié`);
    return this.http.put<Assignment>(this.url, assignment);
  }

  deleteAssignment(assignment:Assignment):Observable<any> {

    //const pos = this.assignments.indexOf(assignment);
    //this.assignments.splice(pos, 1);

    //return of(`Assignment ${assignment.nom} supprimé`);
    return this.http.delete(this.url + assignment._id);
  }

  getSize() {
    return this.http.get(this.url + 'size');
  }
}

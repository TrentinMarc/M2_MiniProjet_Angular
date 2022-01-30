import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { Matiere } from '../matiere/matiere.model';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})

export class MatieresService {
  matieres: Matiere[] = [];

  constructor(private loggingService:LoggingService,
              private http:HttpClient) { }

  // url = "http://localhost:8080/api/matiere";
  // url = "https://api-intense2022.herokuapp.com/api/matieres";
  url = "https://miniprojetbackend.herokuapp.com/api/matiere"

  getMatieres():Observable<Matiere[]> {
    return this.http.get<Matiere[]>(this.url);
  }

  getMatieresPagine(page:number, limit:number):Observable<any> {
    return this.http.get<any>(`${this.url}?page=${page}&limit=${limit}`);
  }

  getMatiere(id:string):Observable<Matiere|undefined> {
    //let matiere = this.matieres.find(elem => elem.id === id);

    //return of(matiere);

    return this.http.get<Matiere>(this.url + "/" + id);
  }

  addMatiere(matiere:Matiere):Observable<any>{
    //this.matieres.push(matiere);

    this.loggingService.log(matiere.libelle, "ajouté");

    //return of(`Matiere ${matiere.nom} ajouté`);

    return this.http.post<Matiere>(this.url, matiere);
  }

  updateMatiere(matiere:Matiere):Observable<any> {
    // pour le moment rien de spécial à faire
    // mais plus tard -> requête PUT sur un web service
    // pour mettre à jour une BD distante...

    //return of(`Matiere ${matiere.nom} modifié`);
    return this.http.put<Matiere>(this.url, matiere);
  }

  deleteMatiere(matiere:Matiere):Observable<any> {

    //const pos = this.matieres.indexOf(matiere);
    //this.matieres.splice(pos, 1);

    //return of(`Matiere ${matiere.nom} supprimé`);
    return this.http.delete(this.url + "/" + matiere._id);
  }

}

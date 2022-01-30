import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Assignment} from "../assignments/assignment.model";
import {User} from "./user.model";
import {AuthService} from "../shared/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  url = 'http://localhost:8080/api/user/';

  getUsers():Observable<User[]> {
    return this.http.get<User[]>(this.url, this.authService.getHeader());
  }

  addUser(newUser: User): Observable<any> {
      return this.http.post(this.url, newUser);
  }

  loginUser(user: User): Observable<any>{
    return this.http.post(this.url+'login', user)
  }
}

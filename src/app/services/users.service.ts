import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// Environnement
import { BASE_URL_API } from 'src/environments/environment';

// Models
import { User } from '../models/user';
import { catchError, map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
  })
  export class UsersService {
  
    baseUrl= BASE_URL_API.url_api_v + 'users/';

    user: User = null;

    constructor(private http:HttpClient) { }

    getUser(userId: string) {  
      return this.http.get<User>(`${this.baseUrl}${userId}`).pipe(
        map(res => res),
        catchError(this.handleError<User>('getUser', null))
      ); 
    }  

    saveUser(user: User) {
      return this.http.patch(`${this.baseUrl}${user.id}`,user)
    } 

    changePassword(userId:string,password:string) {
      return this.http.patch(`${this.baseUrl}${userId}`,{password})
    } 

    changePasswordBis(id:number,password:string) {
      return this.http.patch(`${this.baseUrl}${id}`,{password})
    } 

    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(error);
        this.log(`${operation} failed: ${error.message}`);
    
        return of(result as T);
      };
    }
    
    private log(message: string) {
      console.log(message);
    }
    
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

// Environnement
import { BASE_URL_API } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl= BASE_URL_API.url_api + 'users/login';

  constructor(private http:HttpClient) { }

  login(email:string,password:string) {
    return this.http.post(`${this.baseUrl}`,{email,password},{headers:{skip:"true"}})
  }

  registration(newUser) {
    return this.http.post(BASE_URL_API.url_api_v+'users', newUser, {headers:{skip:"true"}})
  }
}

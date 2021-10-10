import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Environnement
import { BASE_URL_API } from 'src/environments/environment';

// Models
import { File } from '../models/file';


@Injectable({
    providedIn: 'root'
  })
  export class FilesService {
  
    baseUrl= BASE_URL_API.url_api_v + 'image/';

    constructor(private http:HttpClient) { }

    getFile(name: string) {  
        return this.http.get<File>(`${this.baseUrl}get/${name}`); 
    }
    
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

// Environnement
import { BASE_URL_API } from '../../environments/environment';

// Modèles
import { Group } from '../models/group';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  SERVER_URL = BASE_URL_API.url_api_v + 'groups';

  constructor(private http: HttpClient) { }

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.SERVER_URL).pipe(
      map((res: Group[]) => res),
    );
  }

  addGroup(group: Group): Observable<Group> {
    return this.http.post<Group>(`${this.SERVER_URL}`, group).pipe(
      map((res: Group) => res)
    );
  }
}

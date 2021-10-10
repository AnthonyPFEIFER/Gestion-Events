import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BASE_URL_API } from '../../environments/environment';

// Models
import { Evenement } from '../models/evenement';
import { EventsRequest } from '../models/eventsRequest';

@Injectable({
  providedIn: 'root',
})
export class EvenementService {
  SERVER_URL = BASE_URL_API.url_api_v + 'events';

  constructor(private http: HttpClient) {
  }

  getEvenements(): Observable<Evenement[]> {
    return this.http.get<Evenement[]>(this.SERVER_URL).pipe(
      map((res: Evenement[]) => res)
    );
  }

  getAgendaEvenements(withOldSearch: boolean, userIdSearch: string): Observable<Evenement[]> {
    let request:EventsRequest = {withOld: withOldSearch, userId: userIdSearch};

    return this.http.post<Evenement[]>(this.SERVER_URL + "/agenda", request).pipe(
      map((res: Evenement[]) => res)
    );
  }

  getNextEvenements(withOldSearch: boolean, userIdSearch: string): Observable<Evenement[]> {
    let request:EventsRequest = {withOld: withOldSearch, userId: userIdSearch};

    return this.http.post<Evenement[]>(this.SERVER_URL + "/next", request).pipe(
      map((res: Evenement[]) => res)
    );
  }

  getEvenementById(evenementId: number): Observable<Evenement | null | undefined> {
    return this.http.get<Evenement>(this.SERVER_URL + '/' + evenementId).pipe(
      map((res: Evenement) => res),
    );
  }

  getEvenementsByUser(userId: number): Observable<Evenement[]> {
    return this.http.get<Evenement[]>( this.SERVER_URL + '/' + userId).pipe(
      map((res: Evenement[]) => res)
    );
  } 

  addEvenement(evenement: Evenement): Observable<Evenement | null> {
    return this.http.post(this.SERVER_URL, evenement).pipe(
      map((res: any) => res),
    );
    
  }

  updateEvenementById(evenement :Evenement): Observable<Evenement | any> {
    return this.http.put<Evenement>(this.SERVER_URL + '/' + evenement.id, evenement).pipe(
      map((res: Evenement)=> res),
      catchError((err) => err)
    )
  }

  deleteEvenementById(evenement: Evenement): Observable<any> {
    return this.http.delete(this.SERVER_URL + '/' + evenement.id).pipe(
      map(() => true),
      catchError((err)=> err)
    )
  }
}
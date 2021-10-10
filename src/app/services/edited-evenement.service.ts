import { Injectable } from '@angular/core';
import { Evenement } from '../models/evenement';

@Injectable({
  providedIn: 'root'
})
export class EditedEvenementService {

  constructor() { }
  evenement?: Evenement;

  loadEvenement(evenement: Evenement) {
    if (evenement == null) {
      this.evenement = null;
    } else {
      this.evenement = evenement;
      console.log(JSON.stringify(evenement));
    }
  }
}

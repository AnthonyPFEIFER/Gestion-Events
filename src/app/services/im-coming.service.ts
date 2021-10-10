import { Injectable } from '@angular/core';

import { EvenementService } from 'src/app/services/evenement.service';

import { Evenement } from 'src/app/models/evenement';
import { User } from 'src/app/models/user';

@Injectable({
    providedIn: 'root'
  })
  export class ImComingService {
    constructor( private evenementService: EvenementService ) { }

    imComing(event: Evenement, user: User): boolean {
      if (user != null) {
        if(event.users.some(row => row.id == user.id)){
          return true;
        } else{
          return false;
        }
      }
    }

    addUser(event: Evenement, user: User) {
        event.users.push(user);
        this.evenementService.updateEvenementById(event).subscribe()
    }

    removeUser(event: Evenement, user: User) {
        const index = event.users.findIndex(row => row.id == user.id);
        if (index !== -1) {
          event.users.splice(index, 1);
        }
        this.evenementService.updateEvenementById(event).subscribe()  
      }
  }
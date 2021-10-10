import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Evenement } from 'src/app/models/evenement';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';
import { User } from '../models/user';
import { EvenementService } from '../services/evenement.service';
import { AccountService } from '../services/account.service';


@Injectable({
  providedIn: 'root'
})
export class AgendaEventResolver implements Resolve<Observable<Evenement[]>> {
  constructor(private evenementService: EvenementService, private accountService: AccountService) {
  }

  public resolve(): Observable<Evenement[]> {
    return this.evenementService.getAgendaEvenements(false, this.accountService.user.userId)
  }
}
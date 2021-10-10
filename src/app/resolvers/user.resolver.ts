import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';


@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<Observable<User>> {
  constructor(private usersService: UsersService,  private tokenservice: TokenService) {}

  public resolve(): Observable<User> {
    return this.usersService.getUser(this.tokenservice.getId())
  }
}
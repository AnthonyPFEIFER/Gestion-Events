import { AccountService } from './../services/account.service';
import { TokenService } from './../services/token.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private token:TokenService,private account:AccountService,private router:Router){}
  canActivate(


    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean  { 
      
      if(!this.token.loggedIn()){
        this.token.remove();
        this.account.changeStatus(false);
        this.router.navigateByUrl("/login");
        return false;
      } else if (this.account.user == null) {
        this.account.loadUser();
      }
    return true;
  }
  
}

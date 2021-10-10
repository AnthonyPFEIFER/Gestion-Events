import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AfterAuthGuard implements CanActivate {
  constructor(private token:TokenService,private account:AccountService,private router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean  {
      
    if(this.token.loggedIn()){
      
      console.log("AfterAuthGuard + logged");
      this.account.changeStatus(true);
      this.router.navigateByUrl("/");
      return false;
    }
  return true;
  }
  
}

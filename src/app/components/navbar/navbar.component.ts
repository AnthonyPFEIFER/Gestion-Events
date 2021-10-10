import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';

import { AccountService } from '../../services/account.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  logoutIcon = faDoorOpen;

  constructor(public account: AccountService, private token: TokenService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.token.remove();
    this.account.remove();
    this.account.changeStatus(false);
    
    this.router.navigateByUrl("/login");
  }

}

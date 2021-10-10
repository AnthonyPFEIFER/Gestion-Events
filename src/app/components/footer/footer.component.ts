import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { faCalendar, faCog, faDoorOpen, faFilm, faGlassCheers, faMapSigns } from '@fortawesome/free-solid-svg-icons';

import { AccountService } from '../../services/account.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  calendarAltIcon = faCalendarAlt;
  glassCheersIcon = faGlassCheers;
  mapSignsIcon = faMapSigns;
  cogIcon = faCog;
  exitIcon = faDoorOpen;

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

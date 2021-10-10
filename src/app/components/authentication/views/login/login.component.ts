import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { faCheck, faUserAltSlash } from '@fortawesome/free-solid-svg-icons';
import { AppComponent } from '../../../../app.component';
//import { UsersService } from '../../services/users.service';
//import { EnvService } from '../../env.service';
import { AccountService } from '../../../../services/account.service';
import { AuthService } from '../../../../services/auth.service';
import { TokenService } from '../../../../services/token.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorMessage: any;

  connexionIcon = faCheck;
  inscriptionIcon = faUserAltSlash;

  env: any;
  class: any;
  users: any;
  fieldTextType: boolean;


  formLogin: FormGroup;

  constructor(private authService: AuthService, private token: TokenService, private router: Router, private account: AccountService,
     public app: AppComponent, public fb: FormBuilder /*private envservice: EnvService, private userservice: UsersService*/) {

      this.formLogin = this.fb.group({

        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)])
        //envir: ['prod', [Validators.required]],
      })
  }

  ngOnInit(): void {
  }

  login() {
    this.errorMessage = '';
    this.authService.login(this.formLogin.get('email').value, this.formLogin.get('password').value).subscribe(res => this.handleResponse(res), error => {
      if (error.status === 403) {
        this.errorMessage = "Login/Password Incorects";
      }
      else {
        this.errorMessage = "Une erreur Serveur est survenue";
      }
    })
  }

  handleResponse(res:{}) {
    this.token.handle(res);
    this.account.changeStatus(true);
    this.account.loadUser();
    this.router.navigateByUrl("/home/agenda");
  }

  toggleFieldTextType(): void {
    this.fieldTextType = !this.fieldTextType;
  }

}

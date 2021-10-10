import { Component, OnInit, OnDestroy } from '@angular/core';
import { faAt, faSave, faUsers, faUserCircle, faKey } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { FormsModule, FormBuilder } from '@angular/forms';

// Services
import { AccountService } from '../../services/account.service';
import { UsersService } from '../../services/users.service';
import { GroupsService } from '../../services/groups.service';
import { UploadService } from 'src/app/services/upload.service';
import { AuthService } from 'src/app/services/auth.service';

// Models
import { User } from '../../models/user';
import { Group } from 'src/app/models/group';

// Components
import { FileUploadComponent } from '../fileupload/fileupload.component';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {
  $subscription = new Subject();
  
  avatarIcon = faUserCircle;
  atIcon = faAt;
  saveIcon = faSave;
  groupesIcon = faUsers;
  passwordIcon = faKey;

  selectGroupsForm: FormGroup;
  changePasswordForm: FormGroup;

  newPwdSave: boolean;
  errorMessage: string;

  groupsSave: boolean;
  errorMessage2: string;

  listGroups: Group[] = [];

  constructor(private users: UsersService, public account: AccountService, private modalService: NgbModal, 
    public fb: FormBuilder, public uploadService: UploadService, private authService: AuthService, 
    private groupsService: GroupsService) {

    this.account.loadUser();

    this.selectGroupsForm = this.fb.group({
    });

    this.changePasswordForm = this.fb.group({

      oldpassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      newpassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      newpassword2: new FormControl('', [Validators.required, Validators.minLength(6)])
    });

    this.groupsService.getGroups().pipe(take(1)).subscribe((data: Group[]) => {
      this.listGroups = data;
/*       console.log (this.listGroups); */
    });
  }

  ngOnInit(): void {
  }

  selectGroups() {
    this.account.saveGroups().pipe(takeUntil(this.$subscription)).subscribe((userLoaded:User) => {
      this.errorMessage2 = "";
      this.groupsSave = true;
      this.account.refreshUser(userLoaded);
    }, error => {
      if (error.status === 403) {
        this.errorMessage2 = "Le mot de passe actuel est incorrect";
      }
      else {
        this.errorMessage2 = "Une erreur Serveur est survenue";
      }
    })
  }

  changePassword() {
    this.newPwdSave = false;
    if (this.changePasswordForm.get('newpassword').value == this.changePasswordForm.get('newpassword2').value) {
      this.authService.login(this.account.email, this.changePasswordForm.get('oldpassword').value).pipe(takeUntil(this.$subscription)).subscribe(res => this.handleResponse(res), error => {
        if (error.status === 403) {
          this.errorMessage = "Le mot de passe actuel est incorrect";
        }
        else {
          this.errorMessage = "Une erreur Serveur est survenue";
        }
      });
    } else {
      this.errorMessage = "Le nouveau mot de passe n'est pas identique dans les 2 champs";
    }
  }

  handleResponse(res:{}) {
    this.account.changePassword(this.changePasswordForm.get('newpassword').value).pipe(takeUntil(this.$subscription)).subscribe(res => {
      if(res) {
        this.changePasswordForm.get('oldpassword').setValue("");
        this.changePasswordForm.get('newpassword').setValue("");
        this.changePasswordForm.get('newpassword2').setValue("");
        this.errorMessage = "";
        this.newPwdSave = true;
      }
    }, error => {
      if (error.status === 403) {
        this.errorMessage = "Le mot de passe actuel est incorrect";
      }
      else {
        this.errorMessage = "Une erreur Serveur est survenue";
      }
    })
  }

  openAvatarUpload() {
    this.uploadService.type_file = this.uploadService.TYPE_AVATAR;
    const modalRef = this.modalService.open(FileUploadComponent);
  }

  ngOnDestroy() {
    this.$subscription.next();
    this.$subscription.complete();
  }

}
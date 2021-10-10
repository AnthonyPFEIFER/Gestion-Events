import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Models
import { User } from '../models/user';
import { File } from '../models/file';
import { Group } from '../models/Group';

// Services
import {TokenService} from '../services/token.service'
import { UsersService } from './users.service';
import { FilesService } from './files.service';

// Environnement
import { DEFAULT_IMG } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  user: User = null;
  firstname: string = "";
  lastname: string = "";
  email: string = "";

  avatar64: String = DEFAULT_IMG.avatar_default;


  private LoggedIn = new BehaviorSubject<boolean>(this.tokenservice.loggedIn());

  authStatus=this.LoggedIn.asObservable();

  constructor(private tokenservice:TokenService, private usersService:UsersService, private filesService:FilesService ) {  }

  changeStatus(value:boolean){
    this.LoggedIn.next(value);
  }

  getUser() {
    if (this.user == null) {
      this.usersService.getUser(this.tokenservice.getId()).subscribe((userLoaded:User) => {
        this.refreshUser(userLoaded);
        return this.user;
      });  
    } else {
      return this.user;
    }
  }

  loadUser() {
    if (this.user == null && this.tokenservice.getId() != null) {
      this.usersService.getUser(this.tokenservice.getId()).subscribe((userLoaded:User) => {
        this.refreshUser(userLoaded);
      });  
    }
  }

  refreshUser(user: User) {
    this.user = user;
    this.firstname = this.user.firstName;
    this.lastname = this.user.lastName;
    this.email = this.user.email;

    this.loadAvatar();
  }

  saveUser() {
    return this.usersService.saveUser(this.user);
  }

  remove() {
    this.user = null;
    this.firstname = "";
    this.lastname = "";
    this.email = "";
  }

  loadAvatar() {
    if (this.tokenservice.getId() != null) {
      this.filesService.getFile(this.tokenservice.getId()).subscribe((fileLoaded:File) => {
        if (fileLoaded != null && fileLoaded.picByte != null && fileLoaded.picByte.length > 0) {
          this.avatar64 = 'data:image/png;base64,' + fileLoaded.picByte;
        }
      });  
    }
  }

  changePassword(password:string) {
    const userToSave: User = {id: 0, userId: null, firstName: null, lastName: null, email: null, password: null, groups: null,   events: null};
    userToSave.id = this.user.id;
    userToSave.userId = this.user.userId;
    userToSave.password = password;
    return this.usersService.saveUser(userToSave);
  }

  isInGroup(group: Group): boolean {
    if(this.user.groups.some(row => row.id == group.id)){
      return true;
    } else{
      return false;
    }
  }

  addGroup(group: Group) {
    this.user.groups.push(group);
  }

  saveGroups() {
    const userToSave: User = {id: 0, userId: null, firstName: null, lastName: null, email: null, password: null, groups: null,   events: null};
    userToSave.id = this.user.id;
    userToSave.userId = this.user.userId;
    userToSave.groups = this.user.groups;
    return this.usersService.saveUser(userToSave);
  }

  removeGroup(group: Group) {
    const index = this.user.groups.findIndex(row => row.id == group.id);
    if (index !== -1) {
      this.user.groups.splice(index, 1);
    }   
  }
}
import { Component, Input, OnInit } from '@angular/core';
import { Group } from 'src/app/models/group';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-checkgroup',
  templateUrl: './checkgroup.component.html',
  styleUrls: ['./checkgroup.component.scss']
})
export class CheckGroupComponent implements OnInit {
  @Input() group: Group = {
    id: 0,
    name: ''
  };

  isChecked: boolean;

  constructor(private account: AccountService) {
  }

  ngOnInit() {
    this.isChecked = this.account.isInGroup(this.group);
  }

  checkValue() {
    if (this.isChecked) {
      this.account.addGroup(this.group);
    } else {
      this.account.removeGroup(this.group);
    }
  }
}
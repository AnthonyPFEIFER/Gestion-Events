import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  yesIcon = faCheck
  noIcon = faTimes
  validIcon = faCheck
  cancelIcon = faTimes

  @Input() title;
  @Input() question;
  @Input()buttonsType;
  constructor( public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}

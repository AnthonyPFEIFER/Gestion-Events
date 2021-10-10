import { Component, OnInit } from '@angular/core';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { EditedLocationService } from 'src/app/services/edited-location.service';

@Component({
  selector: 'app-picture-location',
  templateUrl: './picture-location.component.html',
  styleUrls: ['./picture-location.component.scss']
})

export class PictureLocationComponent implements OnInit {
  
  closeIcon = faChevronLeft;

  base64: String;
  picByte: String;

  constructor(private activeModal: NgbActiveModal, private modalService: NgbModal, public editedLocation: EditedLocationService) {
 
  }

  ngOnInit(): void {
    this.base64 = "data:image/png;base64," + this.picByte;
  }

  // If the user clicks the cancel button a.k.a. the go back button, then\
  // just close the modal
  closeModal() {
    this.activeModal.dismiss();
  }
}
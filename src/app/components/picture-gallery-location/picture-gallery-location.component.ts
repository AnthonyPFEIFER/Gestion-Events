import { Component, Input, OnInit } from '@angular/core';

import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

// Components
import { PictureLocationComponent } from '../picture-location/picture-location.component';

// Modèle
import { File } from 'src/app/models/file';

// Services
import { EditedLocationService } from 'src/app/services/edited-location.service';

@Component({
  selector: 'app-picture-gallery-location',
  templateUrl: './picture-gallery-location.component.html',
  styleUrls: ['./picture-gallery-location.component.scss']
})

export class PictureGalleryLocationComponent implements OnInit {

  @Input() file: File = {
    id: 0,
    type: '',
    name: '',
    picByte: ''
  };
  
  base64: String;

  constructor(public editedLocation: EditedLocationService, private modalService: NgbModal) {
    
  }

  ngOnInit(): void {
    this.base64 = "data:image/png;base64," + this.file.picByte;
  }

  displayImage() {
    const modalRef = this.modalService.open(PictureLocationComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.picByte = this.file.picByte;
  }
}
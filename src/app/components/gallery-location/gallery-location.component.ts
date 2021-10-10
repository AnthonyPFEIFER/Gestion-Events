import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

// Services
import { LocationService } from 'src/app/services/location.service';
import { EditedLocationService } from 'src/app/services/edited-location.service';

@Component({
  selector: 'app-gallery-location',
  templateUrl: './gallery-location.component.html',
  styleUrls: ['./gallery-location.component.scss']
})

export class GalleryLocationComponent implements OnInit {
  
  closeIcon = faTimes;

  constructor(private activeModal: NgbActiveModal,
    private modalService: NgbModal, 
    public locationService: LocationService,
    public editedLocation: EditedLocationService) {

    this.locationService.getImagesLocationById(this.editedLocation.location.id).subscribe((result2) => {
      this.editedLocation.location.images = result2;
      this.editedLocation.listFile  = result2;
    })
  }

  ngOnInit(): void {
  }

  // If the user clicks the cancel button a.k.a. the go back button, then\
  // just close the modal
  closeModal() {
    this.activeModal.dismiss();
  }
}
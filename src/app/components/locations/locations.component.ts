import { Component, OnInit } from '@angular/core';
import { faPlus, faImages, faTrash, faPen, faMapMarkedAlt, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Modèles
import { Location } from 'src/app/models/location';

// Components
import { GalleryLocationComponent } from '../gallery-location/gallery-location.component';

// Services
import { LocationService } from '../../services/location.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GalleryLocationService } from '../../services/gallery-location.service';
import { EditedLocationService } from 'src/app/services/edited-location.service';
import { ModalService } from '../utilities/modal/modal.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

  plusIcon = faPlus
  picturesIcon = faImages
  deleteIcon = faTrash
  editIcon = faPen
  addressIcon = faMapMarkedAlt
  phoneIcon = faPhoneAlt

  listLocations: Location[] = [];
  location: Location;

  constructor(private locationService: LocationService,  
              public editedLocation: EditedLocationService,
              private galleryLocationService: GalleryLocationService, 
              private modalService: NgbModal, 
              private router: Router,
              private customModalService: ModalService) { 

  }

  ngOnInit(): void {
    this.locationService.getAllLocations().subscribe((data: Location[]) => {
/*       alert(JSON.stringify(data)) */
      this.listLocations = data;
    })
  }


  showGallery(location: Location) {
    this.editedLocation.loadLocation(location);
    const modalRef = this.modalService.open(GalleryLocationComponent, { size: 'lg', backdrop: true });
  }

  newLocation() {
    this.editedLocation.loadLocation(null);
    this.router.navigate(['/home/create-location']);
  }

  openLocation(location: Location) {
    this.editedLocation.loadLocation(location);
    this.router.navigate(['/home/create-location']);
  }

  deleteLocation(location: Location): void {
    const ref = this.customModalService.open(location.name,"Etes vous sûr de supprimer cette adresse ?");
    ref.result.then(res => {
      if (res) {
        this.locationService.deleteLocationById(location).subscribe(then => {
          this.locationService.getAllLocations().subscribe((data: Location[]) => {
            this.listLocations = data;
          });
          this.router.navigate(['/home/locations']);
        });
      } else {
        return
      }
    })
  }
}
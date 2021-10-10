import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import {
  faTimes,
  faSave,
  faPlusSquare,
  faImage,
  faImages,
  faCamera,
  faMapMarkedAlt
} from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

// Services
import { LocationService } from 'src/app/services/location.service';
import { UploadService } from 'src/app/services/upload.service';
import { EditedLocationService } from 'src/app/services/edited-location.service';

// Models
import { Location } from '../../models/location';
import { File } from '../../models/file';

// Components
import { FileUploadComponent } from '../fileupload/fileupload.component';
import { ToasterService } from '../utilities/toaster/toaster.service';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-create-location',
  templateUrl: './create-location.component.html',
  styleUrls: ['./create-location.component.scss'],
})
export class CreateLocationComponent implements OnInit {
  saveIcon = faSave;
  cancelIcon = faTimes;
  addPictureIcon = faPlusSquare;
  picturesIcon = faImages;
  avatarIcon = faImage;
  changeAvatarIcon = faCamera;
  addressIcon = faMapMarkedAlt;

  name = new FormControl('', Validators.required)
  streetAddress = new FormControl('', Validators.required)
  city = new FormControl('Clermont-Ferrand', Validators.required)
  phone = new FormControl('')

  form: FormGroup = new FormGroup({
    name: this.name,
    streetAddress: this.streetAddress,
    city: this.city,
    phone: this.phone,
  });

  constructor(
    private toaster: ToasterService,
    private locationService: LocationService,
    public editedLocation: EditedLocationService,
    public uploadService: UploadService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.editedLocation.location != null) {
      this.name.setValue(this.editedLocation.location.name);
      this.streetAddress.setValue(this.editedLocation.location.adress);
      this.city.setValue(this.editedLocation.location.city);
      this.phone.setValue(this.editedLocation.location.phone);

      this.locationService.getImagesLocationById(this.editedLocation.location.id).subscribe((result2) => {
        this.editedLocation.location.images = result2;
        this.editedLocation.listFile  = result2;
      })
    }
  }

  onSubmit() {
    const location: Location = {
      name: this.name.value,
      adress: this.streetAddress.value,
      city: this.city.value,
      phone: this.phone.value,
      images: []
    }
    if (this.editedLocation.location != null) {
      location.id = this.editedLocation.location.id;
      if (location.images != null) {
        location.images = this.editedLocation.location.images;
      }
    }

    this.locationService.addLocation(location).subscribe(result => {
      this.locationService.getImagesLocationById(location.id).subscribe((result2) => {
        this.editedLocation.location.images = result2;
        this.editedLocation.listFile  = result2;
        this.router.navigate(['home/locations'])
      })
    }
    )
  }

  openAvatarUpload() {
    const location: Location = {
      name: this.name.value,
      adress: this.streetAddress.value,
      city: this.city.value,
      phone: this.phone.value,
      images: [],
    };
    if (this.editedLocation.location != null) {
      location.id = this.editedLocation.location.id;
      if (location.images != null) {
        location.images = this.editedLocation.location.images;
      }
    }

    this.locationService.addLocation(location).subscribe((result) => {
      this.editedLocation.loadLocation(result);
      this.locationService.getImagesLocationById(location.id).subscribe((result2) => {
        this.editedLocation.location.images = result2;
        this.editedLocation.listFile  = result2;
        this.uploadService.type_file = this.uploadService.TYPE_LOCATION;
        const modalRef = this.modalService.open(FileUploadComponent);
      })
    })

  }

  addImageUpload() {
    const location: Location = {
      name: this.name.value,
      adress: this.streetAddress.value,
      city: this.city.value,
      phone: this.phone.value,
      images: [],
    };
    if (this.editedLocation.location != null) {
      location.id = this.editedLocation.location.id;
      if (location.images != null) {
        location.images = this.editedLocation.location.images;
      }
    }

    this.locationService.addLocation(location).subscribe((result) => {
      this.editedLocation.loadLocation(result);
      this.locationService.getImagesLocationById(location.id).subscribe((result2) => {
        this.editedLocation.location.images = result2;
        this.editedLocation.listFile  = result2;
        this.uploadService.type_file = this.uploadService.TYPE_ATTACHED_PICTURE_LOCATION;
        const modalRef = this.modalService.open(FileUploadComponent);
      })
    })

  }

  cancel() {
    this.router.navigate(['/home/locations']);
  }
}

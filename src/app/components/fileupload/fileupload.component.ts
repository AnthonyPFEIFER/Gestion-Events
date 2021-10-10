import { Component, OnInit } from '@angular/core';
import { faCloudUploadAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators} from '@angular/forms';

import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

// Modèles
import { File } from '../../models/file';

// Services
import { AccountService } from 'src/app/services/account.service';
import { UploadService } from 'src/app/services/upload.service';
import { TokenService } from 'src/app/services/token.service';
import { EditedLocationService } from 'src/app/services/edited-location.service';
import { LocationService } from 'src/app/services/location.service';
import { FilesService } from 'src/app/services/files.service';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss']
})

export class FileUploadComponent implements OnInit {
  
  uploadIcon = faCloudUploadAlt;
  closeIcon = faTimes;

  fileuplaod_title = "Upload";
  fileuplaod_text = "Sélectionner un fichier à uploader";

  fileName = "";

  uploadForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  constructor(private activeModal: NgbActiveModal, private modalService: NgbModal, private uploadService: UploadService, private accountService: AccountService, private tokenService: TokenService, public editedLocation: EditedLocationService, public locationService: LocationService, private filesService:FilesService) {
    
    if (this.uploadService.type_file == this.uploadService.TYPE_AVATAR) {
      this.fileuplaod_title = "Votre image de profil";
      this.fileuplaod_text = "Sélectionner une image pour votre image de profil";
      this.fileName = tokenService.getId();
    } else if (this.uploadService.type_file == this.uploadService.TYPE_ATTACHED_PICTURE_LOCATION) {
      this.fileuplaod_title = "Document attaché";
      this.fileuplaod_text = "Sélectionner une image à attacher";
      this.fileName = "gallerylocation" + editedLocation.location.id + "_" + new Date().getTime();
    } else if (this.uploadService.type_file == this.uploadService.TYPE_LOCATION) {
      this.fileuplaod_title = "Image de l'adresse";
      this.fileuplaod_text = "Sélectionner une image pour cette adresse";
      this.fileName = "location" + editedLocation.location.id;
    }
  }

  ngOnInit(): void {
  }

  // When the user clicks the action button a.k.a. the logout button in the\
  // modal, show an alert and followed by the closing of the modal
  actionFunction() {
    const formData = new FormData();
    formData.append('imageFile', this.uploadForm.get('fileSource').value, this.fileName);

    this.uploadService.upload(formData).subscribe((retour: any) => {
      if (retour != null && retour.body != null && retour.body.id != 0) {
        // Avatar
        if (this.uploadService.type_file == this.uploadService.TYPE_AVATAR) {
          this.accountService.loadAvatar();
          this.closeModal();

        } else if (this.uploadService.type_file == this.uploadService.TYPE_ATTACHED_PICTURE_LOCATION) {
          this.filesService.getFile(this.fileName).subscribe((fileLoaded:File) => {
            if (fileLoaded.name != null) {
              if(this.editedLocation.location.images === undefined) {
                this.editedLocation.location.images = [];
              }
              this.editedLocation.location.images.push(fileLoaded);
              this.locationService.addImageToLocation(this.editedLocation.location, fileLoaded).subscribe(result => {
                this.closeModal();
              })
            }
          })
        // Avatar de la location
        } else if (this.uploadService.type_file == this.uploadService.TYPE_LOCATION) {
          this.editedLocation.loadImage();
          this.closeModal();
        }
      }
    });
  }

  // If the user clicks the cancel button a.k.a. the go back button, then\
  // just close the modal
  closeModal() {
    this.activeModal.dismiss();
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.patchValue({
        fileSource: file
      });
    }
  }
}
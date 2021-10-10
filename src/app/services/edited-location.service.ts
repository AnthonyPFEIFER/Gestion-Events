import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { BASE_URL_API } from 'src/environments/environment';

// Modèles
import { Location } from '../models/location';
import { File } from '../models/file';

// Services
import { FilesService } from './files.service';

// Environnement
import { DEFAULT_IMG } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
  })
  export class EditedLocationService {
  
    location: Location = null;
    avatar64: String = DEFAULT_IMG.image_location_default;
    avatar64_default: String = DEFAULT_IMG.image_location_default;
    listFile: File[];

    constructor(private http:HttpClient, private filesService:FilesService) {
        this.avatar64 = DEFAULT_IMG.image_location_default;
    }

    loadLocation(location: Location) {
        if (location == null) {
            this.location = null;
            this.avatar64 = DEFAULT_IMG.image_location_default;
        } else {
            this.location = location;
            this.avatar64 = DEFAULT_IMG.image_location_default;

            this.loadImage();
        }
    }

    loadImage() {
        this.filesService.getFile("location" + this.location.id).subscribe((fileLoaded:File) => {
            if (fileLoaded != null && fileLoaded.picByte != null && fileLoaded.picByte.length > 0) {
              this.avatar64 = 'data:image/png;base64,' + fileLoaded.picByte;
            }
          }); 
      }
}

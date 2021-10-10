import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Models
import { Location } from '../models/location';

@Injectable({
    providedIn: 'root'
  })
  export class GalleryLocationService {
  
    location: Location = null;
  }
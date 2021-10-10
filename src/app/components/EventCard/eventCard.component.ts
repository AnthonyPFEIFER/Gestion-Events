import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  faClock,
  faImages,
  faMapMarked,
  faGrin,
  faSadTear,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs/operators';

// Environnement
import { DEFAULT_IMG } from 'src/environments/environment';

// Models
import { User } from '../../models/user';
import { Evenement } from 'src/app/models/evenement';
import { File } from 'src/app/models/file';
import { Location } from 'src/app/models/location';

// Services
import { FilesService } from '../../services/files.service';
import { GalleryLocationComponent } from '../gallery-location/gallery-location.component';
import { ModalService } from '../utilities/modal/modal.service';
import { ImComingService } from '../../services/im-coming.service';
import { EditedLocationService } from 'src/app/services/edited-location.service';

@Component({
  selector: 'app-eventCard',
  templateUrl: './eventCard.component.html',
  styleUrls: ['./eventCard.component.scss'],
})
export class EventCardComponent implements OnInit {
  @Input() evenement: Evenement;

  @Input() user: User;
  @Input() imComing: boolean;

  /**
   * @example
   * peut prendre en valeur upCommingCard ou agendaCard
   * permet de changer le bouton afficher en boutton je viens !
   * processTarget('yo')
   *
   */
  @Input() type: string;

  @Output() IRefuse = new EventEmitter<Evenement>();
  @Output() IAccept = new EventEmitter<Evenement>();

  picturesIcon = faImages;
  clockIcon = faClock;
  mapMarkerIcon = faMapMarked;
  grinIcon = faGrin;
  tearIcon = faSadTear;
  infoIcon = faInfoCircle;

  listLocations: Location[] = [];
  location: Location;
  base64: string = DEFAULT_IMG.image_location_default;

  constructor(
    private modalService: NgbModal,
    public editedLocation: EditedLocationService,
    private filesService: FilesService,
    private customModalService: ModalService,
    private imComingService: ImComingService,
  ) {}

  ngOnInit() {
    this.location = this.evenement.location;
    this.imComing = this.imComingService.imComing(this.evenement, this.user);
    if (this.location != null) {
      this.filesService
        .getFile('location' + this.location.id)
        .pipe(take(1))
        .subscribe((fileLoaded: File) => {
          if (
            fileLoaded != null &&
            fileLoaded.picByte != null &&
            fileLoaded.picByte.length > 0
          ) {
            this.base64 = 'data:image/png;base64,' + fileLoaded.picByte;
          }
        });
    }
  }

  openDetailEvent() {
    const modalEventRef = this.customModalService.openModalEventDetail(
      this.evenement,
      'detail-event-modal'
    );
    modalEventRef.result
      .then((res) => {
        if (res) {
          this.sendResponseEvent(true)
        } else {
          this.sendResponseEvent(false)
        }
      })
      .catch((error) => console.log(error));
  }

  showGallery(location: Location) {
    if (location != null) {
      this.editedLocation.loadLocation(location);
      this.modalService.open(GalleryLocationComponent, {
        size: 'lg',
        backdrop: true,
      });
    }
  }

  sendResponseEvent(bool: boolean) {
    if (bool) {
      this.IAccept.emit(this.evenement);
    } else {
      this.IRefuse.emit(this.evenement);
    }
  }
}

import { Component, OnInit, Renderer2 } from '@angular/core';
import {
  faTimes,
  faSave,
  faGlassCheers,
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { EvenementService } from '../../services/evenement.service';
import { Evenement } from '../../models/evenement';
import { Location } from '../../models/location';
import { Group } from '../../models/group';
import { User } from '../../models/user';
import { LocationService } from 'src/app/services/location.service';
import { GroupsService } from 'src/app/services/groups.service';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { TokenService } from 'src/app/services/token.service';
import { EditedEvenementService } from 'src/app/services/edited-evenement.service';
import { ModalService } from '../utilities/modal/modal.service';


@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
  saveIcon = faSave;
  cancelIcon = faTimes;
  eventIcon = faGlassCheers;
  deleteIcon = faTrash;

  eventNameControl = new FormControl('', Validators.required)

  locationControl = new FormControl('', Validators.required)

  locationNameControl = new FormControl('', Validators.required)

  streetAddressControl = new FormControl('', Validators.required)

  cityControl = new FormControl('', Validators.required)

  phoneControl = new FormControl('')

  datetimeControl = new FormControl('', Validators.required)

  descriptionControl = new FormControl('')

  now = new Date()

  isChecked: boolean[] = [];

  allLocations: Location[] = [];

  allGroups: Group[] = [];

  author?: User;

  isEditing = false;

  isNewLocation = false;

  name = "Nouvel évènement"

  evenement: Evenement = {
    name: "",
    date: new (Date),
    comment: "",
    type: 'resto',
    location: {
      name: "",
      adress: "",
      city: "",
      phone: "",
      images: []
    },
    groups: [],
    users: []
  }

  form: FormGroup = new FormGroup({
    eventName: this.eventNameControl,
    location: this.locationControl,
    locationName: this.locationNameControl,
    streetAddress: this.streetAddressControl,
    city: this.cityControl,
    phone: this.phoneControl,
    datetime: this.datetimeControl,
    description: this.descriptionControl
  });

  formatDate(date: Date) {
    return date.toISOString().substring(0, 16)
  }

  constructor(
    private evenementService: EvenementService,
    private locationService: LocationService,
    private groupsService: GroupsService,
    private usersService: UsersService,
    private tokenService: TokenService,
    private router: Router,
    private editedEvenement: EditedEvenementService,
    private customModalService: ModalService) {
    this.locationService.getAllLocations().subscribe(result => this.allLocations = result)
    this.isEditing = this.editedEvenement.evenement != null
    this.usersService.getUser(this.tokenService.getId()).subscribe(result =>
      this.author = result
    );

    if (this.isEditing) {
      this.evenement = this.editedEvenement.evenement;
    }

    this.groupsService.getGroups().subscribe(result => {
      this.allGroups = result
      this.allGroups.forEach(group => this.isChecked.push(
        this.evenement.groups.some(
          eventGroup => eventGroup.id === group.id)
      )
      );
    })
  }

  ngOnInit(): void {
    this.locationService.getAllLocations().subscribe()
    this.disableLocationControls()
    if (this.isEditing) {
      this.locationControl.setValue(this.evenement.location.id)
    }
  }


  onLocationChange() {
    if (this.locationControl.value === 'new') {
      this.evenement.location = {
        name: "",
        adress: "",
        city: "Clermont-Ferrand",
        phone: "",
        images: []
      }
      this.isNewLocation = true;
      this.enableLocationControls();
    } else {
      this.evenement.location = this.getLocationById(this.locationControl.value)
      this.isNewLocation = false;
      this.disableLocationControls();
    }
  }

  onSubmit() {
    if (this.locationControl.value === "new") {
      this.locationService.addLocation(this.evenement.location).subscribe(result => {
        this.evenement.location = result
        this.addEvenement()
      })
    }
    else {
      this.evenement.location = this.getLocationById(this.locationControl.value);
      this.addEvenement()
    }
  }

  toggleGroup(groupIndex: number, group: Group) {
    this.isChecked[groupIndex] = !this.isChecked[groupIndex]
    if (this.evenement.groups.some(g => g.id === group.id)) {
      this.evenement.groups = this.evenement.groups.filter(g => g.id !== group.id)
    }
    else {
      this.evenement.groups.push(group)
    }
  }

  getLocationById(id: string) {
    const location = this.allLocations.filter(location => location.id === parseInt(id))[0]
    return location
  }

  addEvenement() {
    const groups: Group[] = this.allGroups.filter((group, index) => this.isChecked[index])
    this.evenement.groups = groups;

    if (this.editedEvenement.evenement == null) {
      this.evenement.author = this.author;
      this.evenementService.addEvenement(this.evenement).subscribe(result => {
        this.cancel()
      })
    }
    else {
      this.evenementService.updateEvenementById(this.evenement).subscribe(result => {
        this.editedEvenement.loadEvenement(null)
        this.cancel()
      })
    }
  }

  disableLocationControls() {
    this.locationNameControl.disable()
    this.cityControl.disable()
    this.streetAddressControl.disable()
    this.phoneControl.disable()
  }

  enableLocationControls() {
    this.locationNameControl.enable()
    this.cityControl.enable()
    this.streetAddressControl.enable()
    this.phoneControl.enable()
  }

  cancel() {
    this.router.navigate(['/home/agenda'])
  }

  supprimer() {
    const ref = this.customModalService.open(this.editedEvenement.evenement.name, "Etes vous sûr de supprimer cet évènement ?");
    ref.result.then(res => {
      if (res) {
        this.evenementService.deleteEvenementById(this.editedEvenement.evenement).subscribe(then => {
          this.cancel();
        });
      } else {
        return
      }
    })
  }
}

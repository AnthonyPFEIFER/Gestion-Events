import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Evenement } from 'src/app/models/evenement';
import { User } from 'src/app/models/user';
import { EditedEvenementService } from 'src/app/services/edited-evenement.service';
import { UsersService } from 'src/app/services/users.service';
import { AccountService } from '../../services/account.service';
import { EvenementService } from '../../services/evenement.service';
import { ImComingService } from '../../services/im-coming.service';
import { TokenService } from '../../services/token.service';
import { ModalService } from '../utilities/modal/modal.service';
import { ToasterService } from '../utilities/toaster/toaster.service';
@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss'],
})
export class AgendaComponent implements OnInit {
  calendarAltIcon = faCalendarAlt;
  plusIcon = faPlus;

  user: User;
  listEvents: Evenement[] = [];
  eventsSemaine: Evenement[] = [];
  eventsMois: Evenement[] = [];
  eventsApres: Evenement[] = [];
  id: number;
  constructor(
    private evenementService: EvenementService,
    private accountService: AccountService,
    private tokenservice: TokenService,
    private usersService: UsersService,
    private imComingService: ImComingService,
    private router: Router,
    private toasterService: ToasterService,
    private customModalService: ModalService,
    private editedEvenement: EditedEvenementService,
    public datepipe: DatePipe,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: { events: Evenement[] }) => {
      this.listEvents = data.events;
      this.refreshList();
    });
  }

  refreshList() {
    if (this.accountService.user != null) {
      this.user = this.accountService.user;
      this.evenementService
        .getAgendaEvenements(false, this.user.userId)
        .subscribe((res: Evenement[]) => {
          this.listEvents = res;
          this.refreshLists();
        });
    } else {
      // On passe par là quand le code est rechargé suite à une modif dans le code dans Visual Studio, cas de figure propre au dév
      this.usersService
        .getUser(this.tokenservice.getId())
        .subscribe((userLoaded: User) => {
          this.user = userLoaded;
          this.accountService.refreshUser(userLoaded);
          this.evenementService
            .getAgendaEvenements(false, userLoaded.userId)
            .subscribe((res: Evenement[]) => {
              this.listEvents = res;
              this.refreshLists();
            });
        });
    }
  }

  refreshLists() {
    let semaine = new Date(Date.now());
    semaine.setHours(23);
    semaine.setMinutes(59);
    semaine.setSeconds(59);
    semaine.setDate(semaine.getDate() + 6);
    var semaineInt: number = +this.datepipe.transform(semaine, 'yyyyMMddHHmm');

    let mois = new Date(Date.now());
    mois.setHours(23);
    mois.setMinutes(59);
    mois.setSeconds(59);
    mois.setMonth(mois.getMonth() + 1);
    var moisInt: number = +this.datepipe.transform(mois, 'yyyyMMddHHmm');
    this.eventsSemaine = [];
    this.eventsMois = [];
    this.eventsApres = [];
    for (let event of this.listEvents) {
      var dateInt: number = +this.datepipe.transform(
        event.date,
        'yyyyMMddHHmm'
      );

      if (dateInt <= semaineInt) {
        this.eventsSemaine.push(event);
      } else if (dateInt <= moisInt) {
        this.eventsMois.push(event);
      } else {
        this.eventsApres.push(event);
      }
    }
  }

  IRefuse(evenement: Evenement) {
    const ref = this.customModalService.open(
      evenement.name,
      'Etes-vous sûr de ne pas venir le ' +
        this.datepipe.transform(evenement.date, 'dd/MM/yyyy à H:mm') +
        ' ?'
    );
    ref.result.then((res) => {
      if (res) {
        const index = this.listEvents.findIndex(
          (row) => row.id == evenement.id
        );
        if (index !== -1) {
          this.listEvents.splice(index, 1);
          this.refreshLists();
        }

        this.imComingService.removeUser(evenement, this.user);
        this.toasterService.showError('Vous ne venez pas =(');
      } else {
        return;
      }
    });
  }

  async add() {
    this.editedEvenement.loadEvenement(undefined);
    await this.router.navigate(['/home/create-event']);
  }
}

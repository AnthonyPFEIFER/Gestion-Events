import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateLocationComponent } from '../create-location/create-location.component';
import { CreateEventComponent } from '../create-event/create-event.component';
import { AccountComponent } from '../account/account.component';
import { CreditComponent } from '../credit/credit.component';
import { AgendaComponent } from '../agenda/agenda.component';
import { HomeComponent } from './home.component';
import { UpcomingEventsComponent } from '../upcomingEvents/upcomingEvents.component';
import { LocationsComponent } from '../locations/locations.component';
import { DetailEventComponent } from '../detail-event/detail-event.component';
import { UserResolver } from '../../resolvers/user.resolver';
import { AgendaEventResolver } from '../../resolvers/agendaEvent.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    component: HomeComponent,
    resolve: {
      user: UserResolver,
    },
    children: [
      { path: 'account', component: AccountComponent },
      { path: 'credit', component: CreditComponent },
      { path: 'agenda', component: AgendaComponent, resolve: {events: AgendaEventResolver} },
      { path: 'locations', component: LocationsComponent },
      { path: 'upcommingEvent', component: UpcomingEventsComponent },
      { path: 'create-location', component: CreateLocationComponent },
      { path: 'create-event', component: CreateEventComponent },
      { path: 'detail-event', component: DetailEventComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class HomeRoutingModule {}

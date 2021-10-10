import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccountComponent } from '../account/account.component';
import { AgendaComponent } from '../agenda/agenda.component';
import { CheckGroupComponent } from '../checkgroup/checkgroup.component';
//import {JwtInterceptor} from '../../services/jwt.interceptor';
import { CreateEventComponent } from '../create-event/create-event.component';
import { CreateLocationComponent } from '../create-location/create-location.component';
import { CreditComponent } from '../credit/credit.component';
import { EventCardComponent } from '../EventCard/eventCard.component';
import { FileUploadComponent } from '../fileupload/fileupload.component';
import { FooterComponent } from '../footer/footer.component';
import { GalleryLocationComponent } from '../gallery-location/gallery-location.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { PictureGalleryLocationComponent } from '../picture-gallery-location/picture-gallery-location.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { UpcomingEventsComponent } from '../upcomingEvents/upcomingEvents.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ToasterComponent } from '../utilities/toaster/toaster.component';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../utilities/modal/modal.component';
import { DetailEventComponent } from '../detail-event/detail-event.component';

@NgModule({
  declarations: [
    HomeComponent,
    AccountComponent,
    CreditComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    AgendaComponent,
    EventCardComponent,
    CheckGroupComponent,
    UpcomingEventsComponent,
    FileUploadComponent,
    GalleryLocationComponent,
    CreateEventComponent,
    CreateLocationComponent,
    PictureGalleryLocationComponent,
    ToasterComponent,
    ModalComponent,
    DetailEventComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgbToastModule
  ],
  providers: [
    /*{
    provide:HTTP_INTERCEPTORS,
    useClass:JwtInterceptor,
    multi:true,
  }*/
  ],
})
export class HomeModule {}

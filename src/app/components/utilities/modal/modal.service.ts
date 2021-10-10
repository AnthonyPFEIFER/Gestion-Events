import { Injectable } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal.component';
import { Evenement } from '../../../models/evenement';
import { Location } from '../../../models/location';
import { DetailEventComponent } from '../../detail-event/detail-event.component';

export interface buttonsLibelle  {
  buttonSuccess?: string,
  buttonDanger?: string
}

enum buttonsType {
  yesNo= "yesNo",
  validerAnnuler= "validerAnnuler"
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  eButtonType = buttonsType;

  modalOption: NgbModalOptions = {
    size: 'md'
  }

  constructor(private NgbModal: NgbModal) { }

  open(title: string ,  question: string ,  typeButtons?: string, size?:string,) {
    if (size) {
      this.modalOption.size = size;
    }
    
    const modalRef = this.NgbModal.open(ModalComponent, this.modalOption);

    modalRef.componentInstance.title = title;
    modalRef.componentInstance.question = question;

    if(typeButtons && typeButtons === "validerAnnuler") {
      modalRef.componentInstance.buttonsType = this.eButtonType.validerAnnuler;
    } else {
      modalRef.componentInstance.buttonsType = this.eButtonType.yesNo;
    }

    return modalRef;
  }

  openModalEventDetail(event: Evenement, customClass?:string) {
    const modalRefDetailEvent = this.NgbModal.open(DetailEventComponent, {
      size: 'lg',
      windowClass: customClass,
    })
    modalRefDetailEvent.componentInstance.evenement = event;
    return modalRefDetailEvent;
  }

}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  toasts = [];


  showSucces(message: string, delay: number = 4000) {
    this.toasts.push({message, class: 'bg-success text-light', delay})
  }
  showError(message: string, delay: number = 4000) {
    this.toasts.push({message, class: 'bg-danger text-light', delay})
  }
  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  resetToast() {
    this.toasts = [];
  }

}

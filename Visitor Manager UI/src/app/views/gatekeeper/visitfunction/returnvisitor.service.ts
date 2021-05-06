import { Injectable } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Injectable({providedIn:'root'})
export class ModalService {
    yourModal:ModalDirective;

    constructor() { }
    
    setModal(modal:ModalDirective) {
    
    this.yourModal=modal;
    
    }
    
    showModal() {
    
    this.yourModal.show();
    
    }
    
    }
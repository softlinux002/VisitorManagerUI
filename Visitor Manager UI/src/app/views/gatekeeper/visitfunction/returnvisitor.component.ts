import { Component, ElementRef, Input, OnInit,ViewChild, OnDestroy } from '@angular/core';
import {ModalService} from './returnvisitor.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-root',
  templateUrl: './returnvisitor.component.html'
})
export class ReturnVisitorComponent implements OnInit {
@ViewChild('primaryModal') primaryModal: ModalDirective;

constructor(private modalService:ModalService) { }

ngOnInit() {

this.modalService.setModal(this.primaryModal);

}

}
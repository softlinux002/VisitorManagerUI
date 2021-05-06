// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// Theme Routing
import { VisitfunctionRoutingModule } from './visitfunction-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VisitfunctionComponent } from './visitfunction/visitfunction.component';
import { ReturnVisitorComponent } from './visitfunction/returnvisitor.component';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  imports: [
    CommonModule,
    VisitfunctionRoutingModule,
    FormsModule,
    ModalModule.forRoot(),
    ReactiveFormsModule
  ],
  declarations: [
    VisitfunctionComponent
  ]
})
export class VisitfunctionModule { }

// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// Theme Routing
import { VisitorRoutingModule } from './visitor-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VisitorComponent } from './visitor/visitor.component';


@NgModule({
  imports: [
    CommonModule,
    VisitorRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    VisitorComponent
  ]
})
export class VisitorModule { }

// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StaffuserComponent } from '../user/staffuser/staffuser.component';
import { GatekeeperComponent } from '../user/gatekeeper/gatekeeper.component';
// import { SuperDashboardComponent } from './superdashboard.component';
// import { VisitorComponent } from './visitor.component';

// Theme Routing
import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VisitorComponent } from './visitor/visitor.component';


@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    StaffuserComponent,
    GatekeeperComponent,
    VisitorComponent
  ]
})
export class UserModule { }

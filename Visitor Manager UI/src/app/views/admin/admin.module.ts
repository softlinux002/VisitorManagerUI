// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdminStaffComponent } from './staff.component';
import { GatekeeperComponent } from './gatekeeper.component';
import { SuperDashboardComponent } from './superdashboard.component';
import { VisitorComponent } from './visitor.component';

// Theme Routing
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AdminStaffComponent,
    GatekeeperComponent,
    SuperDashboardComponent,
    VisitorComponent
  ]
})
export class AdminModule { }

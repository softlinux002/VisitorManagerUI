import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminStaffComponent } from './staff.component';
import { GatekeeperComponent } from './gatekeeper.component';
import { SuperDashboardComponent } from './superdashboard.component';
import { VisitorComponent } from './visitor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Admin'
    },
    children: [
      {
        path: '',
        redirectTo: 'staff'
      },
      {
        path: 'staff',
        component: AdminStaffComponent,
        data: {
          title: 'Satff User'
        }
      },
      {
        path: 'gatekeeper',
        component: GatekeeperComponent,
        data: {
          title: 'Gatekeeper'
        }
      },
      {
        path: 'superdashboard',
        component: SuperDashboardComponent,
        data: {
          title: 'Dashboard'
        }
      },
      {
        path: 'visitor',
        component: VisitorComponent,
        data: {
          title: 'Visitor'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}

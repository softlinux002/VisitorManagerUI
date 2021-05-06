import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaffuserComponent } from '../user/staffuser/staffuser.component';
import { GatekeeperComponent } from '../user/gatekeeper/gatekeeper.component';
// import { SuperDashboardComponent } from './superdashboard.component';
import { VisitorComponent } from '../user/visitor/visitor.component';
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
        path: 'staffuser',
        component: StaffuserComponent,
        data: {
          title: 'Satff User'
        }
      },
      {
        path: 'gatekeeper',
        component: GatekeeperComponent,
        data: {
          title: 'Visitor Manager'
        }
      },
      {
        path: 'visitor',
        component: VisitorComponent,
        data: {
          title: 'Visitor'
        }
      },
    //   {
    //     path: 'superdashboard',
    //     component: SuperDashboardComponent,
    //     data: {
    //       title: 'Dashboard'
    //     }
    //   },
    //   {
    //     path: 'visitor',
    //     component: VisitorComponent,
    //     data: {
    //       title: 'Visitor'
    //     }
    //   }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}

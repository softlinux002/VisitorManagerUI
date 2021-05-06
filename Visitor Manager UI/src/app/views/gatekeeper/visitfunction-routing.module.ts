import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitfunctionComponent } from './visitfunction/visitfunction.component';
//import { GatekeeperComponent } from '../user/gatekeeper/gatekeeper.component';
// import { SuperDashboardComponent } from './superdashboard.component';
//import { VisitorComponent } from '../user/visitor/visitor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Visitor'
    },
    children: [
      {
        path: '',
        redirectTo: 'visitor'
      },
      {
        path: 'visitfunction',
        component: VisitfunctionComponent,
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
export class VisitfunctionRoutingModule {}

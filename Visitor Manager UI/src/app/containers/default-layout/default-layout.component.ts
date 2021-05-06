import {Component } from '@angular/core';
import { navItems } from '../../_nav';
import { superAdminNavItem } from '../../_nav';
import { staffNavItem, gatekeeperNavItem } from '../../_nav';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './../../model/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  public superAdminNavItem = superAdminNavItem;
  public staffNavItem = staffNavItem;
  public gatekeeperNavItem = gatekeeperNavItem;
  public currentUserSubject: any; // BehaviorSubject<any>;
  public superType:boolean;
  public adminType:boolean;
  public staffType:boolean;
  public gatekeeperType:boolean;

  constructor(){
    this.currentUserSubject = (JSON.parse(localStorage.getItem('currentUser')));
    if(this.currentUserSubject.data.Type=="SuperAdmin"){
      this.superType = true;
      this.adminType = false;
      this.staffType=false;
      this.gatekeeperType=false;
    }else if(this.currentUserSubject.data.Type=="Admin"){
      this.adminType = true;
      this.superType = false;
      this.staffType=false;
      this.gatekeeperType=false;
    }else if(this.currentUserSubject.data.Type=="Staff"){
      this.staffType=true;
      this.superType = false;
      this.adminType = false;
      this.gatekeeperType=false;
    }else if(this.currentUserSubject.data.Type=="Gatekeeper"){
      this.gatekeeperType=true;
      this.superType = false;
      this.adminType = false;
      this.staffType=false;
    }
    else{
      this.superType = false;
      this.adminType = false;
      this.staffType=false;
      this.gatekeeperType=false;
    }
  }
  

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
}

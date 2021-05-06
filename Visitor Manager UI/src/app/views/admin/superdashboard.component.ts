import { Component, OnInit } from '@angular/core';  
   import { StaffUserVM } from '../../model/staffuser';  
   import { SuperDashboardService } from './superdashboard.service';  
   import { Observable } from 'rxjs';  
   import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';  
   @Component({  
    selector: 'app-superdashboard',  
    templateUrl: 'superdashboard.component.html'
   }) 

export class SuperDashboardComponent {
    userForm:FormGroup;
    dataSaved = false;  
    massage: string;  
    staffForm: any;  
    staffId: number = 0;
    allStudent: Observable < StaffUserVM[] > ;  
    staffUserVM:StaffUserVM;
    admin$;
    constructor(private formbulider: FormBuilder, private SuperDashboardService: SuperDashboardService) {
        
    }

    Reset() {  
     this.staffForm.reset();  
    }
   
    getAdminUsers() {
        return this.SuperDashboardService.getAdminUsers().subscribe(Response => {
            this.admin$=Response.data;
        });
    }

    ngOnInit(): void {  
     this.staffForm = this.formbulider.group({  
        
     }); 
     this.getAdminUsers();
    }  
}

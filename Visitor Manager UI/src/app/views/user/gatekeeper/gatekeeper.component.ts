import { Component, OnInit } from '@angular/core';
import { GatekeeperVM } from '../../../model/gatekeeper';  
import { Observable } from 'rxjs';  
import { GatekeeperService } from './gatekeeper.service';  
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';  
   
@Component({
  selector: 'app-gatekeeper',
  templateUrl: './gatekeeper.component.html',
  styleUrls: ['./gatekeeper.component.css']
})

export class GatekeeperComponent implements OnInit {
  userForm:FormGroup;
  dataSaved = false;  
  massage: string;  
  gatekeeperForm: any;  
  gatekeeperId: number = 0;
  allGatekeeper: Observable < GatekeeperVM[] > ;  
  GatekeeperVM:GatekeeperVM;
  admin$;
  currentUserSubject:any;
  adminId:string;

  constructor(private formbulider: FormBuilder, private GatekeeperService: GatekeeperService) { 
    this.currentUserSubject=(JSON.parse(localStorage.getItem('currentUser')));
    this.adminId=this.currentUserSubject.data.Id == undefined ? "" : this.currentUserSubject.data.Id;
  }
  GetGatekeeper(GatekeeperVM: GatekeeperVM) {   
    this.GatekeeperService.getGatekeeper(GatekeeperVM).subscribe(
        Response => {
            var res=Response;
            this.allGatekeeper=res.data;
            console.log(this.allGatekeeper);
            console.log(Response);
         }
     );  
    }
    Reset() {  
     this.gatekeeperForm.reset();  
    } 
    
    onFormSubmit() {  
        this.dataSaved = false;  
        const gatekeeper = this.gatekeeperForm.value;  
        this.AddGatekeeper(gatekeeper);  
        this.gatekeeperForm.reset();  
      } 
      
    AddGatekeeper(GatekeeperVM: GatekeeperVM) {  
     GatekeeperVM.AdminId=this.adminId;  
     GatekeeperVM.Id = this.gatekeeperId;  
     this.GatekeeperService.CreateGatekeeper(GatekeeperVM).subscribe(  
      () => {  
       this.dataSaved = true;  
       this.massage = 'Record saved Successfully'; 
       this.GetGatekeeper(GatekeeperVM);
       this.Reset(); 
       this.gatekeeperId = 0;
      });
    }  
    DeleteGatekeeper(GatekeeperId: string) {  
     if (confirm("Are You Sure To Delete this User")) {  
      this.GatekeeperService.DeleteGatekeeper(GatekeeperId).subscribe(  
       () => {  
        this.dataSaved = true;  
        this.massage = "Deleted Successfully";  
        var gatekeeper=new GatekeeperVM; 
        gatekeeper.AdminId=this.adminId;
        this.GetGatekeeper(gatekeeper);
       }  
      );  
     }  
    }  
    GatekeeperEdit(GatekeeperId: string) {  
       
     this.GatekeeperService.GetGatekeeperById(GatekeeperId).subscribe(Response => {  
      this.massage = null;  
      this.dataSaved = false;  
       
      this.gatekeeperId = Response.data.Id;
      this.gatekeeperForm.controls['Name'].setValue(Response.data.Name);  
      this.gatekeeperForm.controls['GatekeeperId'].setValue(Response.data.GatekeeperId);
      this.gatekeeperForm.controls['Email'].setValue(Response.data.Email);  
      this.gatekeeperForm.controls['Mobile'].setValue(Response.data.Mobile);  
      this.gatekeeperForm.controls['Country'].setValue(Response.data.Country);  
      this.gatekeeperForm.controls['State'].setValue(Response.data.State);  
      this.gatekeeperForm.controls['City'].setValue(Response.data.City);  
      this.gatekeeperForm.controls['ZipCode'].setValue(Response.data.ZipCode);  
     });  
    }  

    getAdminUsers() {
        return this.GatekeeperService.getAdminUsers().subscribe(Response => {
            this.admin$=Response.data;
        });
    }

  ngOnInit() {
    this.gatekeeperForm = this.formbulider.group({  
      GatekeeperId: ['', [Validators.required]],  
      Name: ['', [Validators.required]], 
      Email: ['', [Validators.required]],  
      Mobile: ['', [Validators.required]],  
      Country: ['', [Validators.required]],  
      State: ['', [Validators.required]],  
      City: ['', [Validators.required]],  
      ZipCode: ['', [Validators.required]],  
      Password: ['', [Validators.required]] 
    });

     var gatekeeper=new GatekeeperVM; 
     gatekeeper.AdminId=this.adminId;
     this.GetGatekeeper(gatekeeper);  
  }

}

import { Component, OnInit } from '@angular/core';
import { StaffUserVM } from '../../../model/staffuser';  
import { StaffUserService } from './staffuser.service';  
import { Observable } from 'rxjs';  
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';  
   

@Component({
  selector: 'app-staffuser',
  templateUrl: './staffuser.component.html',
  styleUrls: ['./staffuser.component.css']
})
export class StaffuserComponent implements OnInit {
  userForm:FormGroup;
  dataSaved = false;  
  massage: string;  
  staffForm: any;  
  staffId: number = 0;
  allStudent: Observable < StaffUserVM[] > ;  
  staffUserVM:StaffUserVM;
  currentUserSubject:any;
  adminId:string;
  admin$;

  constructor(private formbulider: FormBuilder, private StaffUserService: StaffUserService) {
    this.currentUserSubject=(JSON.parse(localStorage.getItem('currentUser')));
    this.adminId=this.currentUserSubject.data.Id == undefined ? "" : this.currentUserSubject.data.Id;
   }

  GetStaffUser(StaffUserVM: StaffUserVM) {   
    this.StaffUserService.getStaffUser(StaffUserVM).subscribe(
        Response => {
            var res=Response;
            this.staffUserVM=res.data[0];
            this.allStudent=res.data;
            console.log(this.allStudent);
            console.log(Response);
         }
     );  
    }

    Reset() {
     this.staffForm.reset();
    } 
    
    onFormSubmit() {  
        this.dataSaved = false;  
        const staff = this.staffForm.value;  
        this.AddStaff(staff);  
        this.staffForm.reset();  
      } 

    AddStaff(StaffUserVM: StaffUserVM) {
     StaffUserVM.AdminId = this.adminId; 
     StaffUserVM.Id=this.staffId; 
     this.StaffUserService.CreateStaff(StaffUserVM).subscribe(  
      () => {  
       this.dataSaved = true;  
       this.massage = 'Record saved Successfully'; 
       StaffUserVM.AdminId=this.adminId;
       StaffUserVM.StaffName="";
       this.GetStaffUser(StaffUserVM);
       this.Reset(); 
       this.staffId = 0;
      });
    }  
    DeleteStaff(StaffId: string) {  
     if (confirm("Are You Sure To Delete This User")) {  
      this.StaffUserService.DeleteStaff(StaffId).subscribe(  
       () => {  
        this.dataSaved = true;  
        this.massage = "Deleted Successfully";
        this.staffUserVM.AdminId=this.adminId;
        this.staffUserVM.StaffName="";
        this.GetStaffUser(this.staffUserVM);
       }  
      );  
     }  
    }  
    StaffEdit(StaffId: string) {  
       
     this.StaffUserService.getStaffById(StaffId).subscribe(Response => {  
      this.massage = null;  
      this.dataSaved = false;  
       
      this.staffId = Response.data.Id;
      this.staffForm.controls['StaffName'].setValue(Response.data.StaffName);
      this.staffForm.controls['Designation'].setValue(Response.data.Designation);
      this.staffForm.controls['Email'].setValue(Response.data.Email);  
      this.staffForm.controls['Mobile1'].setValue(Response.data.Mobile1);  
      this.staffForm.controls['Mobile2'].setValue(Response.data.Mobile2);  
      this.staffForm.controls['Address'].setValue(Response.data.Address);  
      this.staffForm.controls['State'].setValue(Response.data.State);  
      this.staffForm.controls['City'].setValue(Response.data.City);  
      this.staffForm.controls['ZipCode'].setValue(Response.data.ZipCode);  
      this.staffForm.controls['Comment'].setValue(Response.data.Comment);  
      this.staffForm.controls['Password'].setValue(Response.data.Password);   
     });  
    }  

    getAdminUsers() {
        return this.StaffUserService.getAdminUsers().subscribe(Response => {
            this.admin$=Response.data;
        });
    }

  ngOnInit() {
    this.staffForm = this.formbulider.group({  
      StaffId: ['', [Validators.required]],  
      Designation: ['', [Validators.required]],  
      StaffName: ['', [Validators.required]],  
      AdminId: ['', [Validators.required]],  
      Email: ['', [Validators.required]],  
      Mobile1: ['', [Validators.required]],  
      Mobile2: ['', [Validators.required]],  
      Address: ['', [Validators.required]],  
      State: ['', [Validators.required]],  
      City: ['', [Validators.required]],  
      ZipCode: ['', [Validators.required]],  
      Comment: ['', [Validators.required]],  
      Password: ['', [Validators.required]] 
   }); 
   this.getAdminUsers();
   //this.admin$= adminRec.data;
   var staffUser=new StaffUserVM; 
   staffUser.AdminId=this.adminId;
   staffUser.StaffName="";
   this.GetStaffUser(staffUser);
  }

}

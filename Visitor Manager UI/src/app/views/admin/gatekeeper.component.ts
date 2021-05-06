import { Component, OnInit } from '@angular/core';
import { GatekeeperVM } from '../../model/gatekeeper';  
import { Observable } from 'rxjs';  
import { GatekeeperService } from './gatekeeper.service';  
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';  
   
@Component({
  selector: 'app-gatekeeper',
  templateUrl: './gatekeeper.component.html',
  //styleUrls: ['./gatekeeper.component.css']
})
export class GatekeeperComponent {
  userForm:FormGroup;
    dataSaved = false;  
    massage: string;  
    staffForm: any;  
    staffId: number = 0;
    allStudent: Observable < GatekeeperVM[] > ;  
    GatekeeperVM:GatekeeperVM;
    admin$;
  
  constructor(private formbulider: FormBuilder, private GatekeeperService: GatekeeperService) { }

  GetStudent(GatekeeperVM: GatekeeperVM) {   
    this.GatekeeperService.getStudent(GatekeeperVM).subscribe(
        Response => {
            var res=Response;
            this.GatekeeperVM=res.data[0];
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
      
    AddStaff(GatekeeperVM: GatekeeperVM) {  
     debugger;  
     GatekeeperVM.Id = this.staffId;  
     this.GatekeeperService.CreateStaff(GatekeeperVM).subscribe(  
      () => {  
       this.dataSaved = true;  
       this.massage = 'Record saved Successfully'; 
       GatekeeperVM.AdminId="0";
       GatekeeperVM.Name=""; 
       this.GetStudent(GatekeeperVM);
       this.Reset(); 
       this.staffId = 0;
      });
    }  
    DeleteStaff(StaffId: string) {  
     if (confirm("Are You Sure To Delete this User")) {  
      this.GatekeeperService.DeleteStaff(StaffId).subscribe(  
       () => {  
        this.dataSaved = true;  
        this.massage = "Deleted Successfully";  
        //this.GetStudent();  
       }  
      );  
     }  
    }  
    StaffEdit(StudentId: string) {  
       
     this.GatekeeperService.getStaffById(StudentId).subscribe(Response => {  
      this.massage = null;  
      this.dataSaved = false;  
       
      this.staffId = Response.data.Id;
      this.staffForm.controls['StaffName'].setValue(Response.data.StaffName);  
      this.staffForm.controls['AdminId'].setValue(Response.data.AdminId);  
      this.staffForm.controls['StaffId'].setValue(Response.data.StaffId);  
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
        return this.GatekeeperService.getAdminUsers().subscribe(Response => {
            this.admin$=Response.data;
        });
    }

  ngOnInit() {
    this.staffForm = this.formbulider.group({  
      GatekeeperId: ['', [Validators.required]],  
      Name: ['', [Validators.required]],  
      AdminId: ['', [Validators.required]],  
      Email: ['', [Validators.required]],  
      Mobile: ['', [Validators.required]],  
      Country: ['', [Validators.required]],  
      State: ['', [Validators.required]],  
      City: ['', [Validators.required]],  
      ZipCode: ['', [Validators.required]],  
      Password: ['', [Validators.required]] 
    });
    this.getAdminUsers();
     //this.admin$= adminRec.data;
     var staffUser=new GatekeeperVM; 
     staffUser.AdminId="0";
     staffUser.Name="";
     this.GetStudent(staffUser);  
  }

} 
import { Component, OnInit } from '@angular/core';  
   import { StaffUserVM } from '../../model/staffuser';  
   import { StudentService } from './staff.service';  
   import { Observable } from 'rxjs';  
   import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';  
   @Component({  
    selector: 'app-student',  
    templateUrl: 'staff.component.html'
   }) 

export class AdminStaffComponent {
    userForm:FormGroup;
    dataSaved = false;  
    massage: string;  
    staffForm: any;  
    staffId: number = 0;
    allStudent: Observable < StaffUserVM[] > ;  
    staffUserVM:StaffUserVM;
    admin$;
    constructor(private formbulider: FormBuilder, private StudentService: StudentService) {
        
    }
    GetStudent(StaffUserVM: StaffUserVM) {   
    this.StudentService.getStudent(StaffUserVM).subscribe(
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
     debugger;  
     StaffUserVM.Id = this.staffId;  
     this.StudentService.CreateStaff(StaffUserVM).subscribe(  
      () => {  
       this.dataSaved = true;  
       this.massage = 'Record saved Successfully'; 
       StaffUserVM.AdminId="0";
       StaffUserVM.StaffName=""; 
       this.GetStudent(StaffUserVM);
       this.Reset(); 
       this.staffId = 0;
      });
    }  
    DeleteStaff(StaffId: string) {  
     if (confirm("Are You Sure To Delete this User")) {  
      this.StudentService.DeleteStaff(StaffId).subscribe(  
       () => {  
        this.dataSaved = true;  
        this.massage = "Deleted Successfully";  
        //this.GetStudent();  
       }  
      );  
     }  
    }  
    StaffEdit(StudentId: string) {  
       
     this.StudentService.getStaffById(StudentId).subscribe(Response => {  
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
        return this.StudentService.getAdminUsers().subscribe(Response => {
            this.admin$=Response.data;
        });
    }

    ngOnInit(): void {  
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
     staffUser.AdminId="0";
     staffUser.StaffName="";
     this.GetStudent(staffUser);  
    }  
}

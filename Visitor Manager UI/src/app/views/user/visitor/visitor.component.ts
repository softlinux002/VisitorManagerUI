import { Component, OnInit } from '@angular/core';
import { Visitor } from '../../../model/visitor';  
import { Observable } from 'rxjs';  
import { VisitorService } from './../../admin/visitor.service';  
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'; 

@Component({
  selector: 'app-visitor',
  templateUrl: './../../admin/visitor.component.html',
  styleUrls: ['./visitor.component.css']
})
export class VisitorComponent {
  userForm:FormGroup;
    dataSaved = false;  
    massage: string;  
    visitorForm: any;  
    public currentUserSubject: any;
    allVisitor: Observable < Visitor[] > ;  
    VisitorVM:Visitor;
    admin$;
  
  constructor(private formbulider: FormBuilder, private VisitorService: VisitorService) { }

  onNameChange(event:any){
    var name = event.target.value;
    var vehNo = this.visitorForm.controls.VhicleNumber.value==undefined ? "" :this.visitorForm.controls.VhicleNumber.value;
    var date = this.visitorForm.controls.Date.value==undefined ? "" :this.visitorForm.controls.Date.value;
    this.currentUserSubject=(JSON.parse(localStorage.getItem('currentUser')));
    var adminId=this.currentUserSubject.data.Id == undefined ? "" : this.currentUserSubject.data.Id;
    this.GetVisitor(name, date, vehNo, adminId);
  }

  onVehicleNumberChange(event:any){
    var vehNo = event.target.value;
    var name = this.visitorForm.controls.VisitorName.value==undefined ? "" :this.visitorForm.controls.VisitorName.value;
    var date = this.visitorForm.controls.Date.value==undefined ? "" :this.visitorForm.controls.Date.value;
    this.currentUserSubject=(JSON.parse(localStorage.getItem('currentUser')));
    var adminId=this.currentUserSubject.data.Id == undefined ? "" : this.currentUserSubject.data.Id;
    this.GetVisitor(name, date, vehNo, adminId);
  }

  onDateChange(event:any){
    var date = event.target.value;
    var vehNo = this.visitorForm.controls.VhicleNumber.value==undefined ? "" :this.visitorForm.controls.VhicleNumber.value;
    var name = this.visitorForm.controls.VisitorName.value==undefined ? "" :this.visitorForm.controls.VisitorName.value;
    this.currentUserSubject=(JSON.parse(localStorage.getItem('currentUser')));
    var adminId=this.currentUserSubject.data.Id == undefined ? "" : this.currentUserSubject.data.Id;
    this.GetVisitor(name, date, vehNo, adminId);
  }

  GetVisitor(name: string, date:string, vehNo:string, adminId : string) {   
    this.VisitorService.getVisitors(name,date,vehNo,adminId).subscribe(
        Response => {
            var res=Response;
            this.allVisitor=res.Data;
            console.log(this.allVisitor);
         }
     );  
    }  
    Reset() {  
     this.visitorForm.reset();  
    } 
    
    onFormSubmit() {  
        this.dataSaved = false;  
        const staff = this.visitorForm.value;  
        //this.AddStaff(staff);  
        this.visitorForm.reset();  
      } 
      
    
  ngOnInit() {
    this.visitorForm = this.formbulider.group({
        VisitorName: [null],  
        VhicleNumber: [null],  
        Date: [null]
    });
     this.currentUserSubject=(JSON.parse(localStorage.getItem('currentUser')));
     var adminId=this.currentUserSubject.data.Id == undefined ? "" : this.currentUserSubject.data.Id;
     var name=this.visitorForm.VisitorName == undefined ? "" : this.visitorForm.VisitorName;
     var date=this.visitorForm.Date == undefined ? "" : this.visitorForm.Date;
     var vehNo=this.visitorForm.VhicleNumber == undefined ? "" : this.visitorForm.VhicleNumber;
     this.GetVisitor(name, date, vehNo, adminId);
  }

}

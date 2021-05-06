import { Component, OnInit } from '@angular/core';
import { Visitor } from '../../../model/visitor';  
import { Observable } from 'rxjs';  
import { VisitorService } from './visitor.service';  
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'; 

@Component({
  selector: 'app-visitor',
  templateUrl: './visitor.component.html',
  styleUrls: ['./visitor.component.css']
})
export class VisitorComponent implements OnInit {
  userForm:FormGroup;
  dataSaved = false;  
  massage: string;  
  visitorForm: any;  
  public currentUserSubject: any;
  allVisitor: Observable < Visitor[] > ;  
  VisitorVM:Visitor;
  staffId:string;
  constructor(private formbulider: FormBuilder, private VisitorService: VisitorService) {
    this.currentUserSubject=(JSON.parse(localStorage.getItem('currentUser')));
    this.staffId = this.currentUserSubject.data.Id == undefined ? "" : this.currentUserSubject.data.Id;
   }

   onDateChange(event:any){
    var visitor=new Visitor;
    visitor.StaffId=this.staffId;
    visitor.Date=event.target.value;
    this.GetVisitor(visitor);
  }

   GetVisitor(VisitorVM:Visitor) {   
    this.VisitorService.GetVisitorsByStaff(VisitorVM).subscribe(
        Response => {
            var res=Response;
            this.allVisitor=res.data;
            console.log(this.allVisitor);
         }
     );  
    } 
    
    Reset() {  
      this.visitorForm.reset();
     } 

  ngOnInit() {
    this.visitorForm = this.formbulider.group({  
      Date: [null]
    });

    var visitor=new Visitor;
    visitor.StaffId=this.staffId;
    visitor.Date=this.visitorForm.Date == undefined ? "" : this.visitorForm.Date;
    this.GetVisitor(visitor);
  }

}

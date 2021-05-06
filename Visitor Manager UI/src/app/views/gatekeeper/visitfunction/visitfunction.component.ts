import { Component, OnInit, ViewChild } from '@angular/core';
import { Visitor } from '../../../model/visitor';  
import { Observable } from 'rxjs';  
import { VisitorFunctionService } from './visitfunction.service';  
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'; 
import {ModalDirective} from 'ngx-bootstrap/modal';
import {ModalService} from './returnvisitor.service';
import {ReturnVisitorComponent } from './returnvisitor.component';

@Component({
  selector: 'app-visitfunction',
  templateUrl: './visitfunction.component.html',
  styleUrls: ['./visitfunction.component.css']
})
export class VisitfunctionComponent implements OnInit {
  @ViewChild('primaryModal') public primaryModal: ModalDirective;

  userForm:FormGroup;
    dataSaved = false;  
    massage: string;  
    visitorForm: any;
    returnVisitorForm: any;  
    public currentUserSubject: any;
    allVisitor: Observable < Visitor[] > ;  
    VisitorVM:Visitor;
    staff$;
    gatekeeperId:number=0;
    file:File;
    base64:string;
    visitorId: number = 0;
  
  constructor(private formbulider: FormBuilder, private VisitorFunctionService: VisitorFunctionService) { 
    this.currentUserSubject=(JSON.parse(localStorage.getItem('currentUser')));
    this.gatekeeperId = this.currentUserSubject.data.Id == undefined ? "" : this.currentUserSubject.data.Id;
  }

  // openModal() {
    
  //   this.modalService.setModal(this.returnVisitorComponent.primaryModal);
    
  //   }

  GetVisitor() {   
    this.VisitorFunctionService.GetVisitors(this.gatekeeperId).subscribe(
        Response => {
            var res=Response;
            this.allVisitor=res.data;
            console.log(this.allVisitor);
         }
     );  
    }

    GetStaffByGatekeeperId() {   
      this.VisitorFunctionService.GetStaffUsers(this.gatekeeperId.toString()).subscribe(
          Response => {
              var res=Response;
              this.staff$=res.Data;
              console.log(this.staff$);
           }
       );  
      }
    
    Reset() {  
     this.visitorForm.reset();  
    }
    
    onFormSubmit() {  
        this.dataSaved = false;  
        const staff = this.visitorForm.value;  
        this.AddVisitor(staff);  
        this.visitorForm.reset();  
      }
      
      AddVisitor(Visitor: Visitor) {  
        debugger;  
        Visitor.Id = this.visitorId;
        Visitor.base64 = this.base64;
        Visitor.GatekeeperId=this.gatekeeperId;
        this.VisitorFunctionService.CreateVisitor(Visitor).subscribe(  
         () => {  
          this.dataSaved = true;  
          this.massage = 'Record saved Successfully';  
          this.GetVisitor();
          this.Reset(); 
          this.visitorId = 0;
         });
       }  
      
      onFileChanged(event) {
        this.file = event.target.files[0];
        var base="";
        var reader = new FileReader();
        reader.readAsDataURL(this.file);
        reader.onload = function () {
          base=reader.result.toString();
          console.log(reader.result);
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
        this.base64 = base;
      }

      getBase64(file) {
        var reader = new FileReader();
        var base="";
        reader.readAsDataURL(file);
        reader.onload = function () {
          base=reader.result.toString();
          console.log(reader.result);
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
        this.base64 = base;
     }

     DeleteVisitor(id: number) {  
      if (confirm("Are You Sure To Delete this User")) {  
       this.VisitorFunctionService.DeleteVisitor(id).subscribe(  
        () => {  
         this.dataSaved = true;
         this.massage = "Deleted Successfully";  
         this.GetVisitor();
        }  
       );  
      }  
     }

     VisitorEdit(id: number) {  
       
      this.VisitorFunctionService.getVisitorById(id).subscribe(Response => {  
       this.massage = null;  
       this.dataSaved = false;  
        
       this.visitorId = Response.data.Id;
       this.visitorForm.controls['VisitorName'].setValue(Response.data.VisitorName); 
       this.visitorForm.controls['StaffId'].setValue(Response.data.StaffId);  
       this.visitorForm.controls['Mobile'].setValue(Response.data.Mobile);
       this.visitorForm.controls['Purpose'].setValue(Response.data.Purpose);  
       this.visitorForm.controls['TotalVisitor'].setValue(Response.data.TotalVisitor);  
       this.visitorForm.controls['WhomToVisit'].setValue(Response.data.WhomToVisit);  
       this.visitorForm.controls['VhicleType'].setValue(Response.data.VhicleType);  
       this.visitorForm.controls['VhicleNumber'].setValue(Response.data.VhicleNumber);  
       this.visitorForm.controls['TimeIn'].setValue(Response.data.TimeIn);  
       this.visitorForm.controls['Date'].setValue(Response.data.Date);
      });  
     }

     ReturnVisitorEdit(id: number) {  
      this.primaryModal.show();
      this.VisitorFunctionService.getVisitorById(id).subscribe(Response => {  
       this.massage = null;  
       this.dataSaved = false;  
        
       this.visitorId = Response.data.Id;
       this.returnVisitorForm.controls['TimeOut'].setValue(Response.data.TimeOut);
      });  
     }

     onReturnFormSubmit() {  
      this.dataSaved = false;  
      const visitor = this.returnVisitorForm.value;  
      this.ReturnVisitor(visitor);  
    }

    ReturnVisitor(Visitor: Visitor) {  
      debugger;  
      Visitor.Id = this.visitorId;
      this.VisitorFunctionService.ReturnVisitor(Visitor).subscribe(  
       () => {  
        this.dataSaved = true;  
        this.massage = 'Record saved Successfully';  
        this.GetVisitor();
        this.visitorId = 0;
       });
     }
          
  ngOnInit() {
    this.visitorForm = this.formbulider.group({
      GatekeeperId: ['', Validators.required], 
        VisitorName: ['', Validators.required],
        StaffId:['', Validators.required], 
        Mobile: [null],
        Purpose: ['', Validators.required],
        TotalVisitor: ['', Validators.required],
        WhomToVisit: ['', Validators.required],
        VhicleType: [null],
        VhicleNumber: [null],
        TimeIn: [null],
        Date: ['', Validators.required]
    });

    this.returnVisitorForm = this.formbulider.group({
      TimeOut: ['', Validators.required]
    });

    this.GetStaffByGatekeeperId();
    this.GetVisitor();
  }

}

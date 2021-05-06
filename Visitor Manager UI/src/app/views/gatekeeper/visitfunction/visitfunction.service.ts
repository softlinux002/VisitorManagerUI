import { Injectable } from '@angular/core';    
import {HttpClient} from '@angular/common/http';    
import {HttpHeaders} from '@angular/common/http';    
import { Observable } from 'rxjs';
import { Visitor } from '../../../model/visitor'
    
@Injectable({    
  providedIn: 'root'    
})    
export class VisitorFunctionService {    
    
  Url = 'http://localhost:63147/api';    
  constructor(private http:HttpClient) { }    
//   getStudent():Observable<StaffUserVM[]>    
//   {    
//     return this.http.get<StaffUserVM[]>(this.Url + '/Account/ShowStafUser');    
//   }
  
  GetVisitors(gatekeepeId:number):Observable<any>    
  {    
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };    
    return this.http.get<any>(this.Url + '/Account/ShowVisitorByGatekeeperId?id='+gatekeepeId);
  }

  GetStaffUsers(id:string):Observable<any>    
  {    
    return this.http.get<any>(this.Url +'/Account/GetStaffByGatekeeperId?id='+id);    
  }
  
  CreateVisitor(OutletVM:Visitor):Observable<any>    
  {    
   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
   if(OutletVM.Id>0) {
    return this.http.post<any>(this.Url + '/Account/UpdateVisitor/', OutletVM, httpOptions)   
   } else{
    return this.http.post<any>(this.Url + '/Account/AddVisitor/', OutletVM, httpOptions)    
   }
  }

  ReturnVisitor(OutletVM:Visitor):Observable<any>    
  {    
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.Url + '/Account/ReturnVisitor/', OutletVM, httpOptions)
  }

  DeleteVisitor(id:number):Observable<number>    
  {    
    return this.http.delete<number>(this.Url + '/Account/DeleteVisitor?id='+id);    
  }
  
  getVisitorById(Id: number): Observable<any> {    
    return this.http.get<any>(this.Url + '/Account/EditVisitor?id='+ Id);    
  }
}  
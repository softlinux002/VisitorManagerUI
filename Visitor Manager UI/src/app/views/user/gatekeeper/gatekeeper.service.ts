import { Injectable } from '@angular/core';    
import {HttpClient} from '@angular/common/http';    
import {HttpHeaders} from '@angular/common/http';    
import { Observable } from 'rxjs';    
import { GatekeeperVM } from '../../../model/gatekeeper';    
    
@Injectable({    
  providedIn: 'root'    
})    
export class GatekeeperService {    
    
  Url = 'http://localhost:63147/api';    
  constructor(private http:HttpClient) { }    
//   getStudent():Observable<StaffUserVM[]>    
//   {    
//     return this.http.get<StaffUserVM[]>(this.Url + '/Account/ShowStafUser');    
//   }
  
  getGatekeeper(OutletVM:GatekeeperVM):Observable<any>    
  {    
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };    
    return this.http.post<any>(this.Url + '/Account/ShowGatekeeper', OutletVM, httpOptions);    
  }

  getAdminUsers():Observable<any>    
  {    
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) };    
    return this.http.get<any>(this.Url +'/Account/GetAdminUser');    
  }
  
  CreateGatekeeper(OutletVM:GatekeeperVM):Observable<any>    
  {    
   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
   if(OutletVM.Id>0) {
    return this.http.post<any>(this.Url + '/Account/UpdateGateKeeper/', OutletVM, httpOptions)    
   } else{
    return this.http.post<any>(this.Url + '/Account/AddGateKeeper/', OutletVM, httpOptions)    
   }
  }

  DeleteGatekeeper(StaffId:string):Observable<number>    
  {    
    return this.http.delete<number>(this.Url + '/Account/DeleteGatekeeper?id='+StaffId);    
  } 
  
  GetGatekeeperById(Id: string): Observable<any> {    
    return this.http.get<any>(this.Url + '/Account/GetEditGatekeeper?Id='+ Id);    
  }    
}  
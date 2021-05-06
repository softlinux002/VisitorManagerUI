import { Injectable } from '@angular/core';    
import {HttpClient} from '@angular/common/http';    
import {HttpHeaders} from '@angular/common/http';    
import { Observable } from 'rxjs';    
import { StaffUserVM } from '../../model/staffuser';    
    
@Injectable({    
  providedIn: 'root'    
})    
export class SuperDashboardService {    
    
  Url = 'http://localhost:63147/api';    
  constructor(private http:HttpClient) { }    
//   getStudent():Observable<StaffUserVM[]>    
//   {    
//     return this.http.get<StaffUserVM[]>(this.Url + '/Account/ShowStafUser');    
//   }
  

  getAdminUsers():Observable<any>    
  {    
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) };    
    return this.http.get<any>(this.Url +'/Account/GetAdminUser');    
  }
     
}  
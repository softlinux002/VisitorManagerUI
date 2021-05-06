import { Injectable } from '@angular/core';    
import {HttpClient} from '@angular/common/http';    
import {HttpHeaders} from '@angular/common/http';    
import { Observable } from 'rxjs';
import {Visitor} from '../../../model/visitor';
    
@Injectable({    
  providedIn: 'root'    
})    
export class VisitorService {    
    
  Url = 'http://localhost:63147/api';    
  constructor(private http:HttpClient) { }    
  
  GetVisitorsByStaff(OutletVM:Visitor):Observable<any>    
  {    
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };    
    return this.http.post<any>(this.Url + '/Account/ShowVisitorByStaffId', OutletVM, httpOptions);
  }
   
}  
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';   
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../model/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  loginForm:FormGroup;
  loading=false;
  submitted=false;
  returnUrl:string;

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  constructor(
        private http: HttpClient,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
    ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
}

// convenience getter for easy access to form fields
get f() { return this.loginForm.controls; }

  public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      this.loading = true;
      this.login(this.f.username.value, this.f.password.value)
          .pipe(first())
          .subscribe(
              data => {
                  this.router.navigate([this.returnUrl]);
              },
              error => {
                  //this.alertService.error(error);
                  this.loading = false;
              });
  }

  login(username: string, password: string) {
    //const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>('http://localhost:63147/api/Account/AllUserLogin', { username, password })
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
            if (user) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
            }

            return user;
        }));
  }
}

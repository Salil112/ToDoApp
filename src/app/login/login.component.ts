import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('f', { read: NgForm })
  private _form: any;
  public get form(): any {
    return this._form;
  }
  public set form(value: any) {
    this._form = value;
  }
  
  hide: boolean = true;
  controlStatus: any = {
    username: false,
    password: false
  };

  submitted: boolean = false;
  httpOptions = {
    headers: new HttpHeaders({
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Content-Type':  'application/json'
    })
  }

  constructor(
    private zone: NgZone,
    private router: Router,
    public commonService: CommonService,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
  }

  forgetPassword() {
    this.zone.run(() => {
      this.router.navigate(['/forgot-password']);
    })
  }

  async login(f: NgForm) {
    this.submitted = true;
    if (f.valid) {    
      f.form.disable();
      let data:any = await this.httpClient.get('assets/data.json',this.httpOptions).toPromise();
      let Users = data.User;
      let user = Users.find(x => x.Email == f.value.email && x.Password == f.value.password)
      if(user){
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.commonService.isLoggedIn = true;
        this.commonService.currentUser = user;
        this.router.navigate(['dashboard']);
      } else {
        this.commonService.presentAlert("", "Invalid Emailaddress or Password");
        f.form.enable();
      }
    }else{
      this.submitted = true
      this.controlStatus.username = true
    }
  }

}

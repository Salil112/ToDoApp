import { Component } from '@angular/core';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ToDoApp';
  constructor(public commonService: CommonService){}

  ngOnInit(): void {
    let checkLoginValue = localStorage.getItem('isLoggedIn');
    let user = localStorage.getItem('currentUser');
    this.commonService.isLoggedIn = checkLoginValue ? checkLoginValue == 'true' ? true : false : false;
    this.commonService.currentUser = user ? JSON.parse(user) : '';
  }
}

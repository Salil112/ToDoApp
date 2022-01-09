import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() showLogin: boolean = false;
  @Input() showSignup: boolean = false;
  @Input() showBack: boolean = false;
  @Input() showLogout: boolean = false;
  @Output() performAction = new EventEmitter<any>(true);
  
  constructor(
    public commonService: CommonService,
    private router: Router,) { }

  ngOnInit(): void {
  }

  onClicklogout() {
    
    let dialog = this.commonService.openConfirmationDialog("Sign out", "Are you sure you want to exit application?")

    dialog.afterClosed().subscribe(async result => {
      if(result) {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        sessionStorage.clear();
        this.commonService.isLoggedIn = false;        
        this.router.navigate(['/login']);
      }
    });

  }

  triggerEvent(action, event) {
    let obj = {
      Action: action,
      Event: event
    }
    this.performAction.emit(obj);
  }
}

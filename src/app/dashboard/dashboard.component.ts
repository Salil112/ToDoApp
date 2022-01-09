import { Component, OnInit } from '@angular/core';
import { animate, AUTO_STYLE, state, style, transition, trigger } from '@angular/animations';
import { CommonService } from '../services/common.service';

const DEFAULT_DURATION = 300;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
      trigger('collapse', [
      state('false', style({ height: AUTO_STYLE, visibility: AUTO_STYLE })),
      state('true', style({ height: '0', visibility: 'hidden' })),
      transition('false => true', animate(DEFAULT_DURATION + 'ms ease-in')),
      transition('true => false', animate(DEFAULT_DURATION + 'ms ease-out'))
    ])
  ]
})
export class DashboardComponent implements OnInit {
  collapsed = false;
  inProgressList:Array<any> = [];
  doneList:Array<any> = [];

constructor(public commonService: CommonService) {
    
  this.commonService.toDoList = [{
   "id" : Math.floor((Math.random() * 100) + 1),
 		"name": "Create Dashboard Page",
    "points" : 5,
    "currentIndex" : 1
 	},
 	{
     "id" : Math.floor((Math.random() * 100) + 1),
 		"name": "Create Dashboard Detail Page",
    "points" : 2,
    "currentIndex" : 1
 	}
  ];

  this.commonService.inProgressList = [{
      "id" : Math.floor((Math.random() * 100) + 1),
 		"name": "Create User page",
     "points" : 1,
     "currentIndex" : 2
 	},
 	{
     "id" : Math.floor((Math.random() * 100) + 1),
 		"name": "Create Profile page",
     "points" : 9,
     "currentIndex" : 2
 	},
 	{
     "id" : Math.floor((Math.random() * 100) + 1),
 		"name": "Create Survey page",
     "points" : 9,
     "currentIndex" : 2
 	}
  ];

  this.commonService.doneList = [{
      "id" : Math.floor((Math.random() * 100) + 1),
      "name": "Create Login Page",
      "points" : 9,
      "currentIndex" : 3
 	},
 	{
    "id" : Math.floor((Math.random() * 100) + 1),
    "name": "Create TaskList Page",
    "points" : 4,
    "currentIndex" : 3
 	}];

  }

  ngOnInit(): void {
    this.sessionAccess();
  }

  sessionAccess(){
    if(sessionStorage.toDoList){
      this.commonService.toDoList = JSON.parse(sessionStorage.toDoList)
    }
    if(sessionStorage.inProgressList){
     this.commonService.inProgressList=JSON.parse(sessionStorage.inProgressList)
    }
    if(sessionStorage.doneList){
      this.commonService.doneList=JSON.parse(sessionStorage.doneList)
    }
  }

  onActionChange(obj) {
    switch (obj.Action) {
      case "task":
        this.createTask();
        break;
    }
  }

  createTask(){
      let dialog = this.commonService.openForm({},0,'');
      dialog.afterClosed().subscribe(async result => {
      if(result) {
        this.commonService.toDoList.push(result);
        this.commonService.sessionStore();
      }
    });

  }
}

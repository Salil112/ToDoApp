import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  @Input() name: string;
  @Input() list: any;
  @Input() connectedTo: any;

  constructor(public commonService: CommonService) { }

  ngOnInit(): void {

  }

  sessionAccess() {
    if (sessionStorage.List) {
      this.list = JSON.parse(sessionStorage.List);
    }
  }

  sessionStore() {
    sessionStorage.List = JSON.stringify(this.list);
  }

  trash(list: any[], index, name) {
    let dialog = this.commonService.openConfirmationDialog("Delete", "Are you sure you want to delete this task?");

    dialog.afterClosed().subscribe(async result => {
      if(result) {
        list.splice(index, 1);
        if(name=='To Do'){
          this.commonService.toDoList = list;
        }else if(name=='In Progress'){
          this.commonService.inProgressList = list;
        }else{
          this.commonService.doneList = list
        }
    
        this.commonService.sessionStore();
      }
    });
  }


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }

    if (event.previousContainer.id == 'cdk-drop-list-0') {
      sessionStorage.toDoList = JSON.stringify(event.previousContainer.data)
    } else if (event.previousContainer.id == 'cdk-drop-list-1') {
      sessionStorage.inProgressList = JSON.stringify(event.previousContainer.data)
    } else {
      if (event.previousContainer.id == 'cdk-drop-list-2') {
        sessionStorage.doneList = JSON.stringify(event.previousContainer.data)
      }
    }

    if (event.container.id == 'cdk-drop-list-0') {
      sessionStorage.toDoList = JSON.stringify(event.container.data)
    } else if (event.container.id == 'cdk-drop-list-1') {
      sessionStorage.inProgressList = JSON.stringify(event.container.data)
    } else {
      if (event.container.id == 'cdk-drop-list-2') {
        sessionStorage.doneList = JSON.stringify(event.container.data)
      }
    }
  }

  openTask(item,index,name){
    let dialog = this.commonService.openForm(item,index,name);
    dialog.afterClosed().subscribe(async result => {
    if(result) {
        if(result.value=='To Do'){
          this.commonService.toDoList[result.index]=result;
        }else if(result.value=='In Progress'){
          this.commonService.inProgressList[result.index]=result;
        }else if(result.value=='Done'){
          this.commonService.doneList[result.index]=result;
        }else{
          this.commonService.toDoList.push(result);
        }
        this.commonService.sessionStore();
      
    }
  });

}


}

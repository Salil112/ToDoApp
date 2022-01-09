import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import { AlertComponent } from "../shared/alert/alert.component";
import { ConfirmComponent } from "../shared/confirm/confirm.component";
import { TaskformComponent } from '../shared/taskform/taskform.component';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  isLoggedIn: boolean = false;
  isLoading = false;
  toDoList:Array<any> = [];
  inProgressList:Array<any> = [];
  doneList:Array<any> = [];
  currentUser: any = {};
  currentURL: string = '';
  data: Subject<any> = new Subject();
  httpOptions = {
    headers: new HttpHeaders({
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Content-Type':  'application/json'
    })
  }
  constructor(
    public dialog: MatDialog, private httpClient: HttpClient) { 
      let checkLoginValue = localStorage.getItem('isLoggedIn');
      this.isLoggedIn = checkLoginValue ? checkLoginValue == 'true' ? true : false : false;
      this.getData();
    }

  presentLoading() {
    this.isLoading = true;
  }

  dismiss() {
    this.isLoading = false;
  }

  async presentAlert(header, errMessage) {
    this.dialog.open(AlertComponent, {
      data: {header: header, message: errMessage}
    })
  }

  openConfirmationDialog(pHeader: string, pMessage: string) {    
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {header: pHeader, message: pMessage}
    })

    return dialogRef;
  }

  openForm(objectData: object, index:number, name: string){
    const dialogRef = this.dialog.open(TaskformComponent, {
      data:{details: objectData,indexData: index, nameValue: name },
      panelClass : 'taskModal'
    })

    return dialogRef;
  }

  sessionStore(){
    sessionStorage.toDoList=JSON.stringify(this.toDoList)
    sessionStorage.inProgressList=JSON.stringify(this.inProgressList)
    sessionStorage.doneList=JSON.stringify(this.doneList)
  }

  async getData() {
    let data:any = await this.httpClient.get('assets/data.json',this.httpOptions).toPromise();
    this.data.next(data);
  }
}



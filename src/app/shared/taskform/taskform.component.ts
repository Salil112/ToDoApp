import { Component, Inject, OnInit,ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-taskform',
  templateUrl: './taskform.component.html',
  styleUrls: ['./taskform.component.scss']
})
export class TaskformComponent implements OnInit {
  taskName:string = '';
  storyPoints:string = '';
  storyPointsArray: Array<any> = [];

  constructor( public dialogRef: MatDialogRef<TaskformComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if(this.data!={}){
      this.taskName = this.data.details.name;
      this.storyPoints = this.data.details.points;
    }
    for(let k=1;k<=10;k++){
      this.storyPointsArray.push({
        value:k
      })
    }
  }

  submit(){
    if(this.data!={}){
      this.dialogRef.close({
        id : this.data.id?this.data.id:Math.floor((Math.random() * 100) + 1),
        name:this.taskName,
        points:this.storyPoints,
        currentIndex : this.data.details.currentIndex,
        value:this.data.nameValue,
        index: this.data.indexData,
      });
    }else{
      this.dialogRef.close({
        id : Math.floor((Math.random() * 100) + 1),
        name:this.taskName,
        points:this.storyPoints,
        currentIndex : 1,
      });
    }
  }

}

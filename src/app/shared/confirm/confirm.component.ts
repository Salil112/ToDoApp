import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  fb: FormGroup;
  password: string;
  disableOk: boolean = true;
  controlStatus: any = {
    Password: false
  };

  constructor(
    formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // this.data.password = "********";
    this.fb = formBuilder.group({
      Password: ['', Validators.minLength(8)],
      // id: this.id,
  });

  }

  ngOnInit(): void {
    if(this.data.type=='passwordPrompt'){
      this.fb.valueChanges.subscribe(e => {
        this.controlStatus.Password = true;
        if (!this.fb.get('Password').invalid && this.fb.get('Password').value.length >= 8 ){
          this.disableOk = false;
        }
        else{
          this.disableOk = true;
        }
        //console.log(this.fb.dirty)
      });
    }
    else{
      this.disableOk = false;
    }
  }

  clickOk() {
    //console.log(this.form.value)
    if(this.data.type=='passwordPrompt'){
        this.dialogRef.close(this.fb.value);
    }
    else {
      this.dialogRef.close(true);
    }
  }

  cancel(){
    this.dialogRef.close(false);
  }
}

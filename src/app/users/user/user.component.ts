import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material'

import {UserService } from '../../shared/user.service'
import {WhichAdressService } from '../../shared/which-adress.service';
import {NotificationService } from '../../shared/notification.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private service: UserService,
    private whichAdressService:WhichAdressService,
    private notificationService:NotificationService,
    public dialogRef:MatDialogRef<UserComponent>) { }


  ngOnInit() {
    this.service.getUsers();
  }

  onClear(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.notificationService.success('Deleted Successfully');
  }

  onSubmit(){
    if(this.service.form.valid){
      this.service.insertUser(this.service.form.value);
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.notificationService.success('Submited Successfully');
      this.onClose();
    }
  }

  onClose(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

}

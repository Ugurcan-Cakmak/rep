import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firebase: AngularFireDatabase) { }

  userList: AngularFireList<any>;

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    mobile: new FormControl('', [Validators.required, Validators.minLength(10)]),
    whichAdress: new FormControl(0),
    adress: new FormControl(''),
    gender: new FormControl('1'),
    nationality: new FormControl(false),
    birthDay: new FormControl('')
  });

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      fullName: '',
      email: '',
      mobile: '',
      whichAdress: '0',
      adress: '',
      gender: '1',
      nationality: false,
      birthDay: ''
    })
  }

  getUsers() {
    this.userList = this.firebase.list('users');
    return this.userList.snapshotChanges();
  }

  insertUser(user) {
    this.userList.push({
      fullName: user.fullName,
      email: user.email,
      mobile: user.mobile,
      whichAdress: user.whichAdress,
      adress: user.adress,
      gender: user.gender,
      nationality: user.nationality,
      birthDay: user.birthDay

    });
  }

  updateUser(user) {
    this.userList.update(user.$key,
      {
        fullName: user.fullName,
        email: user.email,
        mobile: user.mobile,
        whichAdress: user.whichAdress,
        adress: user.adress,
        gender: user.gender,
        nationality: user.nationality,
        birthDay: user.birthDay
      });
  }

  deleteUser($key: string) {
    this.userList.remove($key)
  }

  populateForm(user){
    this.form.setValue(_.omit(user,'whichAdressName'));
  }
}

import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class WhichAdressService {
  whichAdressList:AngularFireList<any>;
  array=[];

  constructor(private firebase: AngularFireDatabase) { 
    this.whichAdressList=this.firebase.list('whichAdress');
    this.whichAdressList.snapshotChanges().subscribe(
      list=>{
        this.array=list.map(item=>
          {
            return{
              $key:item.key,
              ...item.payload.val()
            }
          });
      });
  }
  getwhichAdressName($key){
    if($key=="0")
    return "";
    else{
      return _.find(this.array, (obj)=> {return obj.$key==$key;})['name'];
    }
  }
}

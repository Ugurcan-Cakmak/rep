import { Component, OnInit,ViewChild } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import {MatTableDataSource, MatSort, MatPaginator } from '@angular/material'
import { WhichAdressService } from 'src/app/shared/which-adress.service';
import {MatDialog, MatDialogConfig} from "@angular/material"
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private service: UserService,
    private whichAdressService:WhichAdressService,
    private dialog:MatDialog) { }

  listData: MatTableDataSource<any>;
  displayedColumns:string[]=['fullName','email','mobile','adress','whichAdress','actions'];
  @ViewChild(MatSort,null) sort:MatSort;
  @ViewChild(MatPaginator,null) paginator:MatPaginator;
  searchKey:string;

  ngOnInit() {
    this.service.getUsers().subscribe(
      list=>{
        let array=list.map(item=>{
          let whichAdressName=this.whichAdressService.getwhichAdressName(item.payload.val()['whichAdress'])
          return {
            $key:item.key,
            whichAdressName,
            ...item.payload.val()
          };
        });
        this.listData=new MatTableDataSource(array);
        this.listData.sort=this.sort;
        this.listData.paginator=this.paginator;
      }
    );
  }

  onSearchClear(){
    this.searchKey="";
    this.applyFilter();

  }

  applyFilter(){
    this.listData.filter=this.searchKey.trim().toLowerCase();
  }

  onCreate(){
    this.service.initializeFormGroup();
    const dialogConfig= new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="60%";
    this.dialog.open(UserComponent,dialogConfig)
  }

  onEdit(row){
    this.service.populateForm(row);
    const dialogConfig= new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="60%";
    this.dialog.open(UserComponent,dialogConfig)
  }

}

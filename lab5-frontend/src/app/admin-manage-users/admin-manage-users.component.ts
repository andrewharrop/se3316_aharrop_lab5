import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-admin-manage-users',
  templateUrl: './admin-manage-users.component.html',
  styleUrls: ['./admin-manage-users.component.css']
})
export class AdminManageUsersComponent implements OnInit {


  anyUsers:Boolean=false;
  data:any;
  constructor(private http:HttpClient) { }

  getMessage(data){
    return data.data;
  }
  ngOnInit(): void {
    this.http.get('http://' + window.location.hostname + ":3000/admin/listusers").subscribe(data=>{
      this.data=this.getMessage(data);
      console.log(this.data)
      this.anyUsers=true;
    })
  }

}

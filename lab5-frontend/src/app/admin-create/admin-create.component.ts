import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { send } from 'process';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-admin-create',
  templateUrl: './admin-create.component.html',
  styleUrls: ['./admin-create.component.css']
})
export class AdminCreateComponent implements OnInit {


  username:String;
  email:String;
  password:String;
  registererUsername:String=JSON.parse(localStorage.getItem('admin')).username;
  registererEmail:String=JSON.parse(localStorage.getItem('admin')).email
  serverData:String;
  sendInit:Boolean=false;

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.sendInit=false;
  }
  getMessage(data){
    return data.message;
  }
  submit(){
    this.sendInit=true;
    this.http.post('http://' + window.location.hostname + ":3000/admin/registeradmin", 
    {email:this.email, username:this.username, password:this.password, cUsername:this.registererUsername, cEmail:this.registererEmail}).subscribe(data=>{
      this.serverData=this.getMessage(data);
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  email:String;
  password:String;
  serverData:any;
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

onUpdateEmail(event){
  this.email = (<HTMLInputElement>event.target).value;
}
onUpdatePassword(event){
  this.email = (<HTMLInputElement>event.target).value;
}
setServer(value){
  this.serverData = value.message;
}
  submitLogin(){
    //Send post request to users-login
    this.http.post('http://localhost:3000/secure/auth', {email:this.email, password:this.password}).subscribe(data=>{this.setServer(data)})   

  }
}

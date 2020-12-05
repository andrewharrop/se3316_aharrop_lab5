import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { UserAuthServiceService} from '../user-auth-service.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  email:String;
  password:String;
  serverData:any;

  constructor(private http:HttpClient,private authService:UserAuthServiceService,private router:Router) { }

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
serverStatus(value){
  return value.success
}
serverToken(value){
  return value.token;
}
getUser(value){
  return value.user;
}
  submitLogin(){
    //Send post request to users-login
    this.http.post('http://'+window.location.hostname+':3000/secure/auth', {email:this.email, password:this.password}).subscribe(data=>{
      this.setServer(data)
      if(this.serverStatus(data)){
        console.log('here')
        this.authService.storeUserData(this.serverToken(data), this.getUser(data))
        this.router.navigate(['secure/dashboard'])
      }else{

      }


    })   

  }
}

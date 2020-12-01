import { Component, OnInit } from '@angular/core';
import { UserAuthServiceService } from '../user-auth-service.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private authService:UserAuthServiceService, private router:Router, private http:HttpClient) { }
  ngOnInit(){
    this.hasBeenUpdated=false;
  }
  username:String = JSON.parse(localStorage.getItem('user')).username;
  name:String = JSON.parse(localStorage.getItem('user')).name;
  email:String = JSON.parse(localStorage.getItem('user')).email
  password:String;
  hasBeenUpdated=false;
  response:String=""
  getStatus(data){return data.status}
  getMessage(data){ return data.message}
  updatePassword(){
    //update client logic  
    if(this.password!=undefined && this.email!=undefined && this.username!=undefined){
    this.http.post('http://' + window.location.hostname + ':3000/secure/updatepassword', {username:this.username, email:this.email, password:this.password}).subscribe(data=>{
      this.hasBeenUpdated=true;
      this.response=this.getMessage(data);
        
        //true logic
     
        //false logic
      

    })
  }else{
    this.hasBeenUpdated=true;
    this.response="Please enter a password"
  }
}
 

}

import { Component, OnInit } from '@angular/core';
import { HttpClient, } from '@angular/common/http'
import { AdminAuthService } from '../admin-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  email:String;
  password:String;
  serverData:String;
  constructor(private http:HttpClient, private authService:AdminAuthService, private router:Router) { }

  ngOnInit(): void {
  }
  getMessage(data){
    return data.msg
  }
  serverStatus(value){
    return value.success
  }
  serverToken(value){
    return value.token;
  }
  getAdmin(value){
    return value.admin;}
  submitLogin(){
    this.http.post('http://'+window.location.hostname+':3000/admin/auth', {password:this.password, email:this.email}).subscribe(data=>{
      this.serverData = this.getMessage(data);
      if(this.serverStatus(data)){
        console.log('here');
        this.authService.storeUserData(this.serverToken(data), this.getAdmin(data))
        this.router.navigate(['/admin/dashboard']);
      }
    })
  }
}

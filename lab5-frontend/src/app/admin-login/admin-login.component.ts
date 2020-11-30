import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  email:String;
  password:String;
  serverData:String;
  constructor() { }

  ngOnInit(): void {
  }
  submitLogin(){
    console.log('wired')
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  name:String;
  username:String;
  email:String;
  password:String;
  password2:String;
  serverData:any;

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }


  setServer(data){
    this.serverData = data.message;
  }

  submitRegistarion(){
    this.http.post('http://'+window.location.hostname+':3000/secure/register', {name:this.name, username:this.username, email:this.email, password:this.password, password2:this.password2}).subscribe(data=>this.setServer(data));
  }

}

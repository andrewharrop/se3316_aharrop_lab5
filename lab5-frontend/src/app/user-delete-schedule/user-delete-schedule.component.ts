import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-user-delete-schedule',
  templateUrl: './user-delete-schedule.component.html',
  styleUrls: ['./user-delete-schedule.component.css']
})
export class UserDeleteScheduleComponent implements OnInit {
  name:String;
  message:String;
  result:Boolean=false;
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    
  }
  getUsername(value){
    return JSON.parse(value).username
  }
  getMessage(value){
    return value.message
  }
  submit(){
    this.http.post('http://' + window.location.hostname + ":3000/secure/deleteschedule",
    {name:this.name, username:this.getUsername(localStorage.getItem('user'))}).subscribe(data=>{
      this.message=this.getMessage(data);
      this.result=true;
    })
  }

}

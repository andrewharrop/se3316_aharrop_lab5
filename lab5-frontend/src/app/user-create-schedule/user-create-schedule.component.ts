import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-user-create-schedule',
  templateUrl: './user-create-schedule.component.html',
  styleUrls: ['./user-create-schedule.component.css']
})
export class UserCreateScheduleComponent implements OnInit {
  name:String;
  username:String;
  courses:any;
  description:String
  serverStatus:any;
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }
  getMessage(data){
    return data.message
  }
  onSClick(){
    this.username=(JSON.parse(localStorage.getItem('user')).username)
    this.courses=[];
    this.http.post('http://'+ window.location.hostname  +':3000/secure/createschedule', {name:this.name, description:this.description,creator:this.username, courses:this.courses}).subscribe(data=>{
      this.serverStatus = this.getMessage(data);
    })

  }

}

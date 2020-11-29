import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-user-add-to-schedule',
  templateUrl: './user-add-to-schedule.component.html',
  styleUrls: ['./user-add-to-schedule.component.css']
})
export class UserAddToScheduleComponent implements OnInit {
  sname:String;
  scode:String;
  ccode:String;
  serverData:any;
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }
  getMessage(value){
    return value.message;
  }
  submit(){
    this.http.post('http://'+ window.location.hostname + ':3000/secure/addtoschedule', {name:this.sname, subject:this.scode, 
  course:this.ccode, username:JSON.parse(localStorage.getItem('user')).username}).subscribe(data=>{
      this.serverData=this.getMessage(data);
    })
  }
}

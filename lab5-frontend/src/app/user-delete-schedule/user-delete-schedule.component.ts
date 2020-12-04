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
  whichView:boolean=true;
  nowItIs:String="Delete course from schedule"
  sname:String;
  ccode:String;
  scode:String;
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    
  }

  switcher(){
    this.whichView = !this.whichView;
    if(this.nowItIs == "Delete course from schedule") this.nowItIs="Delete schedule";
    else this.nowItIs="Delete course from schedule"
  }

  getUsername(value){
    return JSON.parse(value).username
  }
  getMessage(value){
    return value.message
  }
  getStatus(data){
    return data.status
}
  submit(){
    this.http.post('http://' + window.location.hostname + ":3000/secure/deleteschedule",
    {name:this.name, username:this.getUsername(localStorage.getItem('user'))}).subscribe(data=>{
      this.message=this.getMessage(data);
      this.result=true;
    })
  }
  dcStatus:String=""
  deleteCourse(){
    this.dcStatus=""
    this.http.post('http://' + window.location.hostname + ':3000/secure/deletecourse', {name:this.sname, coursecode:this.ccode, subjectcode:this.scode, creator:JSON.parse(localStorage.getItem('user')).username}).subscribe((data)=>{
      this.dcStatus = this.getStatus(data);
    })
  }

}

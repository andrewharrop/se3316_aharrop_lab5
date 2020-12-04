import { Component, OnInit } from '@angular/core';
import { HttpClient  } from '@angular/common/http'

@Component({
  selector: 'app-users-manage-schedule',
  templateUrl: './users-manage-schedule.component.html',
  styleUrls: ['./users-manage-schedule.component.css']
})
export class UsersManageScheduleComponent implements OnInit {


  view:Boolean=true;
  bName:String="Flag/Unflag";
  scArray=[];
  has=false;
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.getUsersLists()
  }

  getSchedules(data)
  {
    return data.schedules;
  }
  getUsersLists(){
    this.scArray=[]
    this.has=false
    this.http.post('http://' + window.location.hostname + ':3000/secure/getuserschedule', {username:JSON.parse(localStorage.getItem('user')).username}).subscribe(data=>{
    this.scArray = this.getSchedules(data);
    this.has=true
    })
  }

  getStatus(data){
    return data.status
  }
  scNameInput:String="";
  scExists=false;
  savedName:String=""
  searchForSchedule(){
    this.scExists=false
    this.http.post('http://' + window.location.hostname + ':3000/secure/searchschedules', {name:this.scNameInput, creator:JSON.parse(localStorage.getItem('user')).username}).subscribe(data=>{
      this.scExists=this.getStatus(data)
      this.savedName=this.scNameInput
    })
  }
  publicS:Boolean=false;
  viewStatus2:String=""
  changeScheduleState(){
    console.log('here')
    this.http.post('http://' + window.location.hostname + ':3000/secure/flagunflag', {name:this.savedName, public:this.publicS, creator:JSON.parse(localStorage.getItem('user')).username}).subscribe(data=>{
      this.viewStatus2=this.getStatus(data);
    })
  }



  switcher(){
    this.view=!this.view
    if(this.bName=="Flag/Unflag"){
      this.bName="View All"
    }else{
      this.bName="Flag/Unflag";
    } 
  }

}

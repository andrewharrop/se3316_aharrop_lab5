import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-user-change-schedule-name',
  templateUrl: './user-change-schedule-name.component.html',
  styleUrls: ['./user-change-schedule-name.component.css']
})
export class UserChangeScheduleNameComponent implements OnInit {

  scheduleFound:boolean=false;
  savedSCName:String;
ngMInput:String;
newName:String;
finStatus:any
submit2:boolean=false;
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.scheduleFound=false;
    this.savedSCName="";
  }
getStatus(data){
  return data.status
}
  submitSearch(){
    this.scheduleFound=false;
    this.savedSCName="";
    this.http.post('http://' +window.location.hostname+':3000/secure/searchschedules', {name:this.ngMInput, creator:JSON.parse(localStorage.getItem('user')).username}).subscribe(data=>{
    this.scheduleFound = this.getStatus(data);
    if(this.scheduleFound){
      this.savedSCName=this.ngMInput
    }
    })
  }

  submitChanges(){
    this.finStatus=false;
    
    this.http.post('http://' + window.location.hostname + ":3000/secure/changename", {name:this.savedSCName, newname:this.newName, creator:JSON.parse(localStorage.getItem('user')).username}).subscribe(data=>{
      this.finStatus=data;
      console.log(data)
      this.newName=""
      this.submit2=true;
    })


  }

}

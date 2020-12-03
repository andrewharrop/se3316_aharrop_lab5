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

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.scheduleFound=false;
    this.savedSCName="";
  }

  submitSearch(){
    this.http.post('', {name:this.ngMInput, creator:JSON.parse(localStorage.getItem('user')).username}).subscribe(data=>{
      
    })
  }

  submitChange(){

  }

}

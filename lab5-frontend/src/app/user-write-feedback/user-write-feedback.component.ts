import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-user-write-feedback',
  templateUrl: './user-write-feedback.component.html',
  styleUrls: ['./user-write-feedback.component.css']
})
export class UserWriteFeedbackComponent implements OnInit {
  course:String;
  subject:String;
  feedback:String;
  username:String=JSON.parse(localStorage.getItem('user')).username;
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  submit(){
    this.http.post('http://' + window.location.hostname + ':3000/secure/coursefeedback', 
    {creator:this.username, feedback:this.feedback, course:this.course, subject:this.subject}).subscribe(data=>{
    })
  }

}

import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-admin-search-users',
  templateUrl: './admin-search-users.component.html',
  styleUrls: ['./admin-search-users.component.css']
})
export class AdminSearchUsersComponent implements OnInit {

  username:String;
  isFound=false;
  result_init:String;
  result:String;
  queryUser:String="";
checkStatus:boolean=false;
serverStatus2:boolean;
serverStatus2Name:String="";

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }
  getStatus(data){
    return data.status
  }
  search(){
    console.log('here')
    this.result_init="";
    this.queryUser="";
    this.serverStatus2=false;
    this.serverStatus2Name="";
    if(this.username!=undefined){
      this.http.post("http://"+window.location.hostname + ":3000/admin/flagchange", {username:this.username}).subscribe(data=>{
        this.isFound=this.getStatus(data);
        console.log(data)
        if(!this.isFound){
          this.result_init="No user found"
        }else{
          this.queryUser=this.username;
        }
      })
    }else{
      this.result_init="Enter Something"
    }
  }
  change(){
    this.http.post('http://'+window.location.hostname+':3000/admin/flagchange2',{username:this.queryUser, flagged:this.checkStatus}).subscribe(data=>{
      this.serverStatus2= this.getStatus(data);
      if(this.serverStatus2){
        this.serverStatus2Name="Success";
      }else{
        this.serverStatus2Name="Failure"
      }
    
      this.isFound=false
      this.queryUser=""
    })
    
  }

}

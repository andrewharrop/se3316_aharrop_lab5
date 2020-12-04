import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserAuthServiceService } from '../user-auth-service.service'


@Component({
  selector: 'app-unauthenticated-view-public',
  templateUrl: './unauthenticated-view-public.component.html',
  styleUrls: ['./unauthenticated-view-public.component.css']
})
export class UnauthenticatedViewPublicComponent implements OnInit {
  
  miniS=[];
  bigS=[];
  expanded:boolean=false;
  constructor(private http:HttpClient, public auth:UserAuthServiceService) { }
  //dataManager
  serverData;
  expandStatus:String="Expand";
  setServers(data:any){
    this.serverData = data
    //console.log(this.serverData)
  }

  courses;
  fullCourseList=[]
  // develop_view(schedule){
  //   this.fullCourseList=[]
  //   //We have the courses here
  //   this.courses=schedule.courses
  //   if(this.courses.length>0){
  //    //Old gave stackoverflow.
  //     for(let i = 0; i < this.courses.length; i++){
  //       this.http.post('http://' + window.location.hostname + ':3000/secure/getfullcourse', {subject:this.courses[i].subject, course:this.courses[i].course }).subscribe(data=>{
  //         console.log(data)
  //       })
  //       //console.log('Here')
  //       console.log(this.courses[i])
  //     }
  //   }

  //   // for(let i = 0; i < this.courses.length; i++){
  //   //   this.http.post('http://' + window.location.hostname + '"3000/public/unauthsearch', {query:this.courses[i].subject, course:this.courses[i].course}).subscribe(data=>{
  //   //     this.fullCourseList.push(data);
  //   //   })
  //   // }
  //   //console.log(this.fullCourseList)
  //   return this.fullCourseList
  // }
  // miniServer(data){
  //   this.miniS=[];
  //   this.miniS.push(["Schedule Name", data.message[0].scheduleName])
  //   this.miniS.push(["Creator userame", data.message[0].creator])
  //   this.miniS.push(["Course Count", data.message[0].course.length])

  // }
  // fullServer(data){
  //   this.bigS=[];
  //   //for(let x = 0' x < mess)
  //   this.bigS.push(["Schedule Name", data.message[0].scheduleName])
  //   this.bigS.push(["Creator userame", data.message[0].creator])
  //   //List courses
  //   //this.bigS.push(["Course Count", data.message[0].course.length])
  // }
  onExpand(){
    this.expanded=!this.expanded;
    if(this.expandStatus="Expand"){
      this.expandStatus="Minimize"
      
    }else{
      this.expandStatus="Expand"
    }
    
  }
  getServer() {
      let response:any;
      this.http.get('http://'+window.location.hostname+':3000/public/schedules').toPromise().then(data=>{
       this.setServers(
         data
         )
        //this.develop_view(data)
         //console.log(data)

     })

   }
  
    
   ngOnInit() {
    this.getServer()
  }

}
/*
 let url = this.getServer()
     url.subscribe((data)=>{
      
      if(data){
        this.schedules = this.parseSchedules(data)

        this.finished=true;

      }

    })*/ 
       // }
    
   // }catch{
     // console.log('here')

     // return false
    //}
   // schedules:Object;
  //finished=false;
// }
// vSchedules(){
//   console.log(this.schedules)
// }
// getMessages(value){
//   return value.messages
// }
// parseSchedules(scheduler:any){
//   //try{
//     let schedule_new=[];

//   if(scheduler){
//   let values = scheduler.message
//   for (let i = 0; i < values.length; i++){
//     schedule_new.push(values[i]);
//   }
// }
// return schedule_new

// }
/*
<div *ngIf="finished==true">

    <div *ngFor="let schedule of schedules; index as i">
        <div [innerHTML]=parseSchedules(schedules)[i].creator></div>
    </div>
</div>
*/
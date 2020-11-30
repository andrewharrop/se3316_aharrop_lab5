import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-unauthenticated-view-public',
  templateUrl: './unauthenticated-view-public.component.html',
  styleUrls: ['./unauthenticated-view-public.component.css']
})
export class UnauthenticatedViewPublicComponent implements OnInit {
  

  constructor(private http:HttpClient) { }
  //dataManager
  serverData;
  
  setServers(data:any){
    this.serverData = data
    console.log(data)
  }

  getServer() {
      let response:any;
      this.http.get('http://'+window.location.hostname+':3000/public/schedules').toPromise().then(data=>{
       this.setServers(
         data
         )

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
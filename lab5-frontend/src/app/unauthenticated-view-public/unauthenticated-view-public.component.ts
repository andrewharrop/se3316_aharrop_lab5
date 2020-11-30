import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-unauthenticated-view-public',
  templateUrl: './unauthenticated-view-public.component.html',
  styleUrls: ['./unauthenticated-view-public.component.css']
})
export class UnauthenticatedViewPublicComponent implements OnInit {
  schedules:Object;
  finished=false;
  constructor(private http:HttpClient) { }

   getServer() {
    //console.log('here')
     return this.http.get('http://localhost:3000/public/schedules')
  
  }
  vSchedules(){
    console.log(this.schedules)
  }
  getMessages(value){
    return value.messages
  }
    
   ngOnInit() {
    let url = this.getServer()
     url.subscribe((data)=>{
      this.schedules = data;
      this.finished=true;
      console.log(this.schedules)

    })

  }

}

import { Component, OnInit } from '@angular/core';
import { UserAuthGuardGuard } from '../user-auth-guard.guard';
import { UserAuthServiceService} from '../user-auth-service.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  constructor(private authService:UserAuthServiceService, private router:Router) { }

  user:Object;
  
  getProfile(value){
    return value.user
  }

  ngOnInit() {
    if(this.authService.loggedIn()){
      this.authService.getProfile().subscribe(profile=>{
        this.user = this.getProfile(profile);
        
      },
      err=>{
        //this.router.navigate(['/login'])
       //console.log(err);
        return false;
      }
  
      )}
      else{
        this.router.navigate(['/login'])
      }
    // if(this.auth.loggedIn()){
    //   this.router.navigate(['/login']);
    // }
  }

}

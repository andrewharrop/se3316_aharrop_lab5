import { Component, OnInit } from '@angular/core';
import { UserAuthServiceService } from '../user-auth-service.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private authService:UserAuthServiceService, private router:Router) { }
  user:Object;
  
  getProfile(value){
    return value.user
  }
  
  ngOnInit(){
    
  }

}

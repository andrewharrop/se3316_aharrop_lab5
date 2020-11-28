import { Component, OnInit } from '@angular/core';
import { UserAuthServiceService } from '../user-auth-service.service'
import {Router} from '@angular/router';
@Component({
  selector: 'app-user-logout',
  templateUrl: './user-logout.component.html',
  styleUrls: ['./user-logout.component.css']
})
export class UserLogoutComponent implements OnInit {

  constructor(private authService:UserAuthServiceService, private router:Router) { }

  ngOnInit(): void {
  }
  onLogoutClick(){
    this.authService.logout();
    console.log('logout success')
    this.router.navigate(['/login'])
}
}

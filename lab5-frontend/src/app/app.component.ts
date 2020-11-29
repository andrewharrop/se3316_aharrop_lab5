import { Component } from '@angular/core';
import {UserAuthGuardGuard } from  './user-auth-guard.guard'
import {Router } from '@angular/router'
import { UserAuthServiceService} from './user-auth-service.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lab5-frontend';
  //let loggedIn = UserAuthServiceService.loggedIn();
  
  
}

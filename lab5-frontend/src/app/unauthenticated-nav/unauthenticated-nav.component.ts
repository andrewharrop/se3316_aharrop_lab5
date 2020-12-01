import { Component, OnInit } from '@angular/core';
import { UserAuthServiceService } from '../user-auth-service.service';
import { AdminAuthService } from '../admin-auth.service';
import { CommonModule } from '@angular/common';  

@Component({
  selector: 'app-unauthenticated-nav',
  templateUrl: './unauthenticated-nav.component.html',
  styleUrls: ['./unauthenticated-nav.component.css']
})
export class UnauthenticatedNavComponent implements OnInit {

  constructor(public auth:UserAuthServiceService, public admin:AdminAuthService) { }

  ngOnInit(): void {
  }

}

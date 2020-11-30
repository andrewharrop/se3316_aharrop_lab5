import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
// import { Observable } from 'rxjs';
// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import {AdminAuthService} from './admin-auth.service'


@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor( private router:Router, private authService:AdminAuthService){}
  //canActivate(){}
  canActivate() {
    if(this.authService.loggedIn() && localStorage.getItem('admin')) {
      return true;
    } else {
      this.router.navigate(['/admin/login']);
      return false;
    }
}
  
}

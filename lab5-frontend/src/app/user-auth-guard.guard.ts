import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import {UserAuthServiceService} from './user-auth-service.service'

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuardGuard implements CanActivate {
constructor(private router:Router, private authService:UserAuthServiceService){ }


    canActivate() {
      if(this.authService.loggedIn()) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
  }
  
}

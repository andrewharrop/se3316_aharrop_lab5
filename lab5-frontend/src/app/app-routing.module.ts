import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserAuthGuardGuard} from './user-auth-guard.guard'
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';



const routes: Routes = [
  { path: "login", component: UserLoginComponent },
  { path: "register", component: UserRegistrationComponent },
  { path:"secure/profile", component:UserProfileComponent, canActivate:[UserAuthGuardGuard]},
  { path: "secure/dashboard", component: UserDashboardComponent, canActivate:[UserAuthGuardGuard] },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

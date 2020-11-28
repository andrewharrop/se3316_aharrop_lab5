import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';



const routes: Routes = [
  { path: "login", component: UserLoginComponent },
  { path: "register", component: UserRegistrationComponent },
  { path:"secure/profile", component:UserProfileComponent},
  { path: "secure/dashboard", component: UserDashboardComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

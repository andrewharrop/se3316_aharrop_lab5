import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserAuthGuardGuard} from './user-auth-guard.guard'
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UnauthenticatedNavComponent } from './unauthenticated-nav/unauthenticated-nav.component';
import { UnauthenticatedSearchComponent } from './unauthenticated-search/unauthenticated-search.component';
import { UnauthenticatedViewPublicComponent } from './unauthenticated-view-public/unauthenticated-view-public.component';



const routes: Routes = [
  { path: "login", component: UserLoginComponent },
  { path: "register", component: UserRegistrationComponent },
  { path:"secure/profile", component:UserProfileComponent, canActivate:[UserAuthGuardGuard]},
  { path: "secure/dashboard", component: UserDashboardComponent, canActivate:[UserAuthGuardGuard] },
  { path: "search", component: UnauthenticatedSearchComponent},
  { path: 'viewPublic', component:UnauthenticatedViewPublicComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from '@angular/common';  

import {UserAuthGuardGuard} from './user-auth-guard.guard'
import {UserAuthServiceService} from './user-auth-service.service'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserLogoutComponent } from './user-logout/user-logout.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UnauthenticatedNavComponent } from './unauthenticated-nav/unauthenticated-nav.component';
import { UnauthenticatedSearchComponent } from './unauthenticated-search/unauthenticated-search.component';
import { UnauthenticatedViewPublicComponent } from './unauthenticated-view-public/unauthenticated-view-public.component';
import { UserCreateScheduleComponent } from './user-create-schedule/user-create-schedule.component';
import { UserAddToScheduleComponent } from './user-add-to-schedule/user-add-to-schedule.component';
import { UserDeleteScheduleComponent } from './user-delete-schedule/user-delete-schedule.component';
import { PublicPrivicyPolicyComponent } from './public-privicy-policy/public-privicy-policy.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminFlagUserComponent } from './admin-flag-user/admin-flag-user.component';
import { UserWriteFeedbackComponent } from './user-write-feedback/user-write-feedback.component';
import { AdminCreateComponent } from './admin-create/admin-create.component';
import { AdminManageUsersComponent } from './admin-manage-users/admin-manage-users.component';
import { AdminSearchUsersComponent } from './admin-search-users/admin-search-users.component';



@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserRegistrationComponent,
    UserDashboardComponent,
    UserLogoutComponent,
    UserProfileComponent,
    UnauthenticatedNavComponent,
    UnauthenticatedSearchComponent,
    UnauthenticatedViewPublicComponent,
    UserCreateScheduleComponent,
    UserAddToScheduleComponent,
    UserDeleteScheduleComponent,
    PublicPrivicyPolicyComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    AdminFlagUserComponent,
    UserWriteFeedbackComponent,
    AdminCreateComponent,
    AdminManageUsersComponent,
    AdminSearchUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [UserAuthServiceService,UserAuthGuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

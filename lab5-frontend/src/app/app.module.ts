import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { HttpClientModule } from "@angular/common/http";

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
    UserAddToScheduleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UserAuthServiceService,UserAuthGuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

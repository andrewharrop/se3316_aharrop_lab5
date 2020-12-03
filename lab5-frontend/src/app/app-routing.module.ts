import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserAuthGuardGuard } from './user-auth-guard.guard'
import { AdminAuthGuard } from './admin-auth.guard'
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UnauthenticatedNavComponent } from './unauthenticated-nav/unauthenticated-nav.component';
import { UnauthenticatedSearchComponent } from './unauthenticated-search/unauthenticated-search.component';
import { UnauthenticatedViewPublicComponent } from './unauthenticated-view-public/unauthenticated-view-public.component';
import { UserCreateScheduleComponent } from './user-create-schedule/user-create-schedule.component'
import { UserAddToScheduleComponent } from './user-add-to-schedule/user-add-to-schedule.component';
import { UserDeleteScheduleComponent } from './user-delete-schedule/user-delete-schedule.component';
import { PublicPrivicyPolicyComponent } from './public-privicy-policy/public-privicy-policy.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component'
import { UserWriteFeedbackComponent } from './user-write-feedback/user-write-feedback.component';
import { AdminCreateComponent } from './admin-create/admin-create.component';
import { AdminManageUsersComponent } from './admin-manage-users/admin-manage-users.component';
import { AdminSearchUsersComponent } from './admin-search-users/admin-search-users.component';

const routes: Routes = [
  { path: "login", component: UserLoginComponent },
  { path: "", component: UserLoginComponent },
  { path: "register", component: UserRegistrationComponent },
  { path: "secure/profile", component: UserProfileComponent, canActivate: [UserAuthGuardGuard] },
  { path: "secure/dashboard", component: UserDashboardComponent, canActivate: [UserAuthGuardGuard] },
  { path: "search", component: UnauthenticatedSearchComponent },
  { path: 'viewPublic', component: UnauthenticatedViewPublicComponent },
  { path: 'secure/createschedule', component: UserCreateScheduleComponent, canActivate: [UserAuthGuardGuard] },
  { path: 'secure/addtoschedule', component: UserAddToScheduleComponent, canActivate: [UserAuthGuardGuard] },
  { path: 'secure/profile', component: UserProfileComponent, canActivate: [UserAuthGuardGuard] },
  { path: 'secure/deleteschedule', component: UserDeleteScheduleComponent, canActivate: [UserAuthGuardGuard] },
  { path: 'privicypolicy', component: PublicPrivicyPolicyComponent },
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [AdminAuthGuard] },
  { path: 'secure/writefeedback', component: UserWriteFeedbackComponent, canActivate: [UserAuthGuardGuard] },
  { path: 'admin/manageusers', component: AdminManageUsersComponent, canActivate: [AdminAuthGuard] },
  { path: 'admin/createadmin', component: AdminCreateComponent, canActivate: [AdminAuthGuard] },
  { path: 'admin/searchusers', component: AdminSearchUsersComponent, canActivate: [AdminAuthGuard] }




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

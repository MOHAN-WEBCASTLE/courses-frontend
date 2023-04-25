import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { InstitutionsComponent } from './institutions/institutions.component';
import { CoursesComponent } from './courses/courses.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from 'src/auth.guard';

const routes: Routes = [
  {
    path:"",
    canActivate:[AuthGuard],
    component:DashboardComponent,
    children:[
      {
        path:'',
        component:UsersComponent
      },
      {
        path:'institution',
        component:InstitutionsComponent
      },
      {
        path:'courses/:id',
        component:CoursesComponent
      }
    ]
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'signup',
    component:SignupComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

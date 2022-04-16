import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavBarComponent } from './common/nav-bar/nav-bar.component';
import { AddEventComponent } from './myComponents/add-event/add-event.component';
import { AddUserComponent } from './myComponents/add-user/add-user.component';
import { ExampleComponent } from './myComponents/example/example.component';
import { LoginComponent } from './myComponents/login/login.component';
import { ViewEventsComponent } from './myComponents/view-events/view-events.component';
import { ViewUsersComponent } from './myComponents/view-users/view-users.component';
import { AuthGuard } from './common/auth.guard';
import { GetEventsComponent } from './myComponents/get-events/get-events.component';


const routes: Routes = [
  {
    path:'',
    component: NavBarComponent,
    children:[
      {
        path: 'home',
        component: ExampleComponent
      },
      {
        path: 'viewEvents',
        component: ViewEventsComponent,
        canActivate: [AuthGuard]
      },
      {
        path:'login',
        component: LoginComponent
      },
      
      {
        path: 'addEvent',
        component: AddEventComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'register',
        component: AddUserComponent
      },
      {
        path: 'edit/:id',
        component: AddUserComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'viewUsers',
        component: ViewUsersComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'getEvents',
        component: GetEventsComponent,
        canActivate: [AuthGuard]
      },
      
      
    ]
  }
];

// const routes: Routes = [
//   {
//     path: '',
//     component: LoginComponent
//   },
//   {
//     path:'user',
//     loadChildren: () => import('./common/user/user.module').then(m => m.UserModule)
//   }
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './myComponents/login/login.component';
//import { NavBarComponent } from './common/nav-bar/nav-bar.component';
//import { AddEventComponent } from './myComponents/add-event/add-event.component';
//import { ExampleComponent } from './myComponents/example/example.component';
//import { ViewEventsComponent } from './myComponents/view-events/view-events.component';

// const routes: Routes = [
//   { path: 'home', component: ExampleComponent },
//   { path: 'view', component: ViewEventsComponent },
//   { path: 'add', component: AddEventComponent },
// ];

// const routes: Routes = [
//   {
//     path:'',
//     component: NavBarComponent,
//     children:[
//       {
//         path: 'home',
//         component: ExampleComponent
//       },
//       {
//         path: 'view',
//         component: ViewEventsComponent
//       },
//       {
//         path: 'add',
//         component: AddEventComponent
//       }
//     ]
//   }
// ];

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path:'user',
    loadChildren: () => import('./common/user/user.module').then(m => m.UserModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

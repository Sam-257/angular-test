import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEventComponent } from 'src/app/myComponents/add-event/add-event.component';
import { ExampleComponent } from 'src/app/myComponents/example/example.component';
import { ViewEventsComponent } from 'src/app/myComponents/view-events/view-events.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

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
        path: 'view',
        component: ViewEventsComponent
      },
      {
        path: 'add',
        component: AddEventComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExampleComponent } from './myComponents/example/example.component';
import { ViewEventsComponent } from './myComponents/view-events/view-events.component';
import { AddEventComponent } from './myComponents/add-event/add-event.component';
import { NavBarComponent } from './common/nav-bar/nav-bar.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from './common/api.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoginComponent } from './myComponents/login/login.component';
import { GalleryComponent } from './myComponents/gallery/gallery.component';
import { HomeHeaderComponent } from './myComponents/home-header/home-header.component';
import { HomeCardsComponent } from './myComponents/home-cards/home-cards.component';
import { CarouselComponent } from './myComponents/carousel/carousel.component';
import { NextDirective } from './myComponents/carousel/next.directive';
import { PrevDirective } from './myComponents/carousel/prev.directive';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DemoInterceptor } from './demo.interceptor';
import { AddUserComponent } from './myComponents/add-user/add-user.component';
import { ViewUsersComponent } from './myComponents/view-users/view-users.component';
import { AuthGuard } from './common/auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';

import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { GetEventsComponent } from './myComponents/get-events/get-events.component';

@NgModule({
  declarations: [
    AppComponent,
    ExampleComponent,
    ViewEventsComponent,
    AddEventComponent,
    NavBarComponent,
    LoginComponent,
    GalleryComponent,
    HomeHeaderComponent,
    HomeCardsComponent,
    CarouselComponent,
    NextDirective,
    PrevDirective,
    AddUserComponent,
    ViewUsersComponent,
    GetEventsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    MatDatepickerModule,
    MatInputModule,
    NgxMatDatetimePickerModule, 
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatFormFieldModule,
    MatNativeDateModule,
  ],
  providers: [
    ApiService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DemoInterceptor,
      multi: true
    },
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

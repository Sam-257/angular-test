import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExampleComponent } from './myComponents/example/example.component';
import { ViewEventsComponent } from './myComponents/view-events/view-events.component';
import { AddEventComponent } from './myComponents/add-event/add-event.component';
import { NavBarComponent } from './common/nav-bar/nav-bar.component';
import { FormsModule } from '@angular/forms';
import { SiblingEventService } from './myComponents/sibling-event.service';
import { ApiService } from './myComponents/api.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoginComponent } from './myComponents/login/login.component';
import { GalleryComponent } from './myComponents/gallery/gallery.component';
import { HomeHeaderComponent } from './myComponents/home-header/home-header.component';
import { HomeCardsComponent } from './myComponents/home-cards/home-cards.component';
import { CarouselComponent } from './myComponents/carousel/carousel.component';
import { NextDirective } from './myComponents/carousel/next.directive';
import { PrevDirective } from './myComponents/carousel/prev.directive';
import { HttpClientModule } from '@angular/common/http';

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
    PrevDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxPaginationModule,
    HttpClientModule
  ],
  providers: [SiblingEventService,ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }

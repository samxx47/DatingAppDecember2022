import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './commonelements/navbar/navbar.component';
import { FooterComponent } from './commonelements/footer/footer.component';
import { WhoWeAreComponent } from './pages/home/who-we-are/who-we-are.component';
import { WhatWeDoComponent } from './pages/home/what-we-do/what-we-do.component';
import { OurServicesComponent } from './pages/home/our-services/our-services.component';
import { TestimonialsComponent } from './pages/home/testimonials/testimonials.component';
import { HerobannerComponent } from './pages/home/herobanner/herobanner.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactusComponent } from './pages/home/contactus/contactus.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    WhoWeAreComponent,
    WhatWeDoComponent,
    OurServicesComponent,
    TestimonialsComponent,
    HerobannerComponent,
    ContactusComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

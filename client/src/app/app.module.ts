import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';

import { SharedModule } from './_modules/shared.module';
import { TestErrorComponent } from './errors/test-error/test-error.component';
import { ErrorInterceptor } from './_interceptor/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { MembersCardComponent } from './members/members-card/members-card.component';
import { JwtInterceptor } from './_interceptor/jwt.interceptor';
import { MembersEditComponent } from './members/members-edit/members-edit.component';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { TestInputsComponent } from './_froms/test-inputs/test-inputs.component';
import { DatePickerComponent } from './_forms/date-picker/date-picker.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    MemberDetailComponent,
    ListsComponent,
    MessagesComponent,
    TestErrorComponent,
    NotFoundComponent,
    ServerErrorComponent,
    MembersCardComponent,
    MembersEditComponent,
    PhotoEditorComponent,
    TestInputsComponent,
    DatePickerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
      //to use angular forms we must include
      FormsModule,  //this enable us to make a two way binding between components and html page

    //to enable http request we use.
    HttpClientModule,

    SharedModule
  ],
  providers:
  [{provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
   {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}],

  bootstrap: [AppComponent]
})
export class AppModule { }

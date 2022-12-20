import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
      //for the toastr
      ToastrModule.forRoot({
        positionClass:'toast-bottom-right'
      }),
      //adding the bootstrap dropdown module
      BrowserAnimationsModule,
      BsDropdownModule.forRoot()
  ],
  exports:[
    BsDropdownModule,
    ToastrModule
  ]
})
export class SharedModule { }

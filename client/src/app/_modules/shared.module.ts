import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TabsModule } from 'ngx-bootstrap/tabs'
import { NgxGalleryModule } from '@kolkov/ngx-gallery';




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
      BsDropdownModule.forRoot(),
      TabsModule.forRoot(),
      NgxGalleryModule,
      // NgxSpinnerModule.forRoot({
      //   type:'line-scale-party'
      // })
  ],
  exports:[
    BsDropdownModule,
    ToastrModule,
    TabsModule,
    NgxGalleryModule,
    NgxGalleryModule,

  ]
})
export class SharedModule { }

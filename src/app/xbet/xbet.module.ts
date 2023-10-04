import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { XbetRoutingModule } from './xbet-routing.module';
import { XbetComponent } from './xbet.component';
import { CarouselComponent } from './carousel/carousel.component';
import { NgxSpinnerModule } from "ngx-spinner";


@NgModule({
  declarations: [XbetComponent, CarouselComponent],
  imports: [
    CommonModule,
    XbetRoutingModule,
    FormsModule,
    NgxSpinnerModule
  ]
})
export class XbetModule { }

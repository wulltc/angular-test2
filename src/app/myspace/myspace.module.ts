import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyspaceRoutingModule } from './myspace-routing.module';
import { MyspaceComponent } from './myspace.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { Ng2SmartTableModule } from 'ng2-smart-table';




@NgModule({
  declarations: [MyspaceComponent],
  imports: [
    CommonModule,
    MyspaceRoutingModule,
    NgxSpinnerModule,
    Ng2SmartTableModule
  ]
})
export class MyspaceModule { }

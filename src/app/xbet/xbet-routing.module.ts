import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { XbetComponent } from './xbet.component';

const routes: Routes = [{ path: '', component: XbetComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class XbetRoutingModule { }

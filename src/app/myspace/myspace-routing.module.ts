import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyspaceComponent } from './myspace.component';

const routes: Routes = [{ path: '', component: MyspaceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyspaceRoutingModule { }

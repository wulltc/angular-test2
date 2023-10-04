import { AuthGuard } from './auth.guard';
import { E404Component } from './e404/e404.component';
import { ExchangeComponent } from './exchange/exchange.component';
import { NewLandingComponent } from './new-landing/new-landing.component';
import { PartnersComponent } from './partners/partners.component';
import { ContactsComponent } from './contacts/contacts.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { FaqComponent } from './faq/faq.component';
import { EchangesComponent } from './echanges/echanges.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo:'welcome',
    pathMatch:'full'
  },
  {
    path:'welcome',
    component:NewLandingComponent,
  },
  {
    path:'exchange',
    component:EchangesComponent
  },
  {
    path:'faq',
    component:FaqComponent
  },
  {
    path:'feedback',
    component:FeedbackComponent
  },
  {
    path:'contacts',
    component:ContactsComponent
  },
  {
    path:'parteners',
    component:PartnersComponent
  },
  {
    path:'proceed/:from/:to',
    component:ExchangeComponent
  },
  {
    path: 'not-found',
    component:E404Component
  },
  { path: '1XBET', loadChildren: () => import('./xbet/xbet.module').then(m => m.XbetModule) },
  { path: 'mes-transactions', canActivate: [AuthGuard] , loadChildren: () => import('./myspace/myspace.module').then(m => m.MyspaceModule) },
  {
    path:'**',
    redirectTo:'not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

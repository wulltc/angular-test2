import { AuthGuard } from './auth.guard';
import { ExchangesServiceService } from './services/exchanges-service.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LandingComponent } from './landing/landing.component';
import { EchangesComponent } from './echanges/echanges.component';
import { FaqComponent } from './faq/faq.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { PartnersComponent } from './partners/partners.component';
import { ContactsComponent } from './contacts/contacts.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { NewLandingComponent } from './new-landing/new-landing.component';
import { NewNavbarComponent } from './new-navbar/new-navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { ExchangeComponent } from './exchange/exchange.component';
import { FormsModule } from '@angular/forms';
import { E404Component } from './e404/e404.component';
import { SupportedCryptosComponent } from './supported-cryptos/supported-cryptos.component';
import {NgxWebstorageModule} from 'ngx-webstorage';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LandingComponent,
    EchangesComponent,
    FaqComponent,
    FeedbackComponent,
    PartnersComponent,
    ContactsComponent,
    NewLandingComponent,
    NewNavbarComponent,
    HomeComponent,
    FooterComponent,
    ExchangeComponent,
    E404Component,
    SupportedCryptosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    NgxSpinnerModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [ExchangesServiceService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

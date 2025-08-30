import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {provideHttpClient, withFetch} from '@angular/common/http';
import {LangingpageComponent} from './langingpage/langingpage.component';
import {provideOAuthClient} from 'angular-oauth2-oidc';

@NgModule({
  declarations: [
    AppComponent,
    LangingpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    provideHttpClient(withFetch()),
    provideOAuthClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

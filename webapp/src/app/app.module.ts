import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TestBlockComponent} from './test-block/test-block.component';
import {HttpClientModule} from '@angular/common/http';

import {HtmlPipe} from './login/login.pipe';
import {HtmlPipe1} from './register/register.pipe';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';

import {NbThemeModule, NbLayoutModule, NbSidebarModule, NbButtonModule, NbSidebarService} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';


@NgModule({
  declarations: [
    AppComponent,
    HtmlPipe,
    HtmlPipe1,
    TestBlockComponent,
    LoginComponent,
    RegisterComponent,
    WelcomePageComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NbThemeModule.forRoot({name: 'default'}),
    NbLayoutModule,
    NbEvaIconsModule,
    NbSidebarModule,
    NbButtonModule
  ],
  providers: [NbSidebarService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

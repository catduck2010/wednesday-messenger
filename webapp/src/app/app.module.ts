import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TestBlockComponent} from './test-block/test-block.component';
import {HttpClientModule} from '@angular/common/http';

<<<<<<< Updated upstream
import { HtmlPipe } from './login/login.pipe';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
=======
import {HtmlPipe} from './login/login.pipe';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {NbThemeModule, NbLayoutModule, NbSidebarModule, NbButtonModule, NbSidebarService} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
>>>>>>> Stashed changes


@NgModule({
  declarations: [
    AppComponent,
    HtmlPipe,
    TestBlockComponent,
    LoginComponent,
<<<<<<< Updated upstream
    RegisterComponent
=======
    RegisterComponent,
    WelcomePageComponent
>>>>>>> Stashed changes
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

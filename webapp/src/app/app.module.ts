import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainComponent} from './components/main/main.component';
import {HttpClientModule} from '@angular/common/http';

import {HtmlPipe} from './components/login/login.pipe';
import {HtmlPipe1} from './components/register/register.pipe';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';

import {
  NbThemeModule,
  NbLayoutModule,
  NbSidebarModule,
  NbButtonModule,
  NbSidebarService,
  NbTabsetModule,
  NbContextMenuModule,
  NbMenuService,
  NbInputModule,
  NbDialogModule,
  NbChatModule,
  NbUserModule,
  NbToastrModule,
  NbMenuModule,
  NbCardModule,
  NbWindowService,
  NbWindowModule,
  NbListModule,
  NbCheckboxModule,
  NbRadioModule
} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {WelcomePageComponent} from './components/welcome-page/welcome-page.component';
import {FormsModule} from '@angular/forms';
import {ChatComponent} from './components/chat/chat.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ChatBlockDirective} from './chat-block.directive';


@NgModule({
  declarations: [
    AppComponent,
    HtmlPipe,
    HtmlPipe1,
    MainComponent,
    LoginComponent,
    RegisterComponent,
    WelcomePageComponent,
    ChatComponent,
    ChatBlockDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NbThemeModule.forRoot({name: 'default'}),
    NbMenuModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbLayoutModule,
    NbToastrModule.forRoot(),
    NbEvaIconsModule,
    NbSidebarModule,
    NbButtonModule,
    FormsModule,
    NbTabsetModule,
    NbContextMenuModule,
    NbInputModule,
    NbChatModule,
    NbUserModule,
    BrowserAnimationsModule,
    NbCardModule,
    NbListModule,
    NbCheckboxModule,
    NbRadioModule
  ],
  providers: [NbSidebarService, NbMenuService, NbWindowService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

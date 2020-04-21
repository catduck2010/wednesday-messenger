import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainComponent} from './main/main.component';
import {HttpClientModule} from '@angular/common/http';

import {HtmlPipe} from './login/login.pipe';
import {HtmlPipe1} from './register/register.pipe';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';

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
  NbToastrModule, NbMenuModule, NbCardModule
} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {WelcomePageComponent} from './welcome-page/welcome-page.component';
import {FormsModule} from '@angular/forms';
import {ChatComponent} from './chat/chat.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ChatBlockDirective } from './chat-block.directive';


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
    ChatBlockDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NbThemeModule.forRoot({name: 'default'}),
    NbMenuModule.forRoot(),
    NbDialogModule.forRoot(),
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
    NbCardModule
  ],
  providers: [NbSidebarService, NbMenuService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

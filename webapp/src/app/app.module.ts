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

import {
  NbThemeModule,
  NbLayoutModule,
  NbSidebarModule,
  NbButtonModule,
  NbSidebarService,
  NbTabsetModule, NbContextMenuModule, NbMenuService, NbInputModule, NbDialogModule, NbChatModule, NbUserModule
} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {WelcomePageComponent} from './welcome-page/welcome-page.component';
import {FormsModule} from "@angular/forms";
import { ChatComponent } from './chat/chat.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { FriendListComponent } from './friend-list/friend-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HtmlPipe,
    HtmlPipe1,
    TestBlockComponent,
    LoginComponent,
    RegisterComponent,
    WelcomePageComponent,
    ChatComponent,
    ChatListComponent,
    FriendListComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NbThemeModule.forRoot({name: 'default'}),
    NbDialogModule.forRoot(),
    NbLayoutModule,
    NbEvaIconsModule,
    NbSidebarModule,
    NbButtonModule,
    FormsModule,
    NbTabsetModule,
    NbContextMenuModule,
    NbInputModule,
    NbChatModule,
    NbUserModule
  ],
  providers: [NbSidebarService, NbMenuService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

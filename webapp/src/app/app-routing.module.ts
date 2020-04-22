import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {MainComponent} from './components/main/main.component';
import {WelcomePageComponent} from './components/welcome-page/welcome-page.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginGuard} from './login.guard';

// routing things
const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'index', component: MainComponent, canActivate: [LoginGuard]},
  {path: 'welcome', component: WelcomePageComponent},
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

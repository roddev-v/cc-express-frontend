import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {AuthGuard} from "./shared/guards/auth.guard";
import {MainComponent} from "./components/business/main/main.component";
import { RedirectComponent } from './redirect/redirect.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'redirect/:shortUrl',
    component: RedirectComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Clilente/auth/login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: "full" },
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)],
  exports: [
      RouterModule
    ]
})
export class AppRoutingModule { }

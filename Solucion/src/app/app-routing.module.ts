import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Cliente/logueo/login/login.component';
import { PrincipalComponent } from './Cliente/logueo/principal/principal.component';


const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'principal', component: PrincipalComponent }
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

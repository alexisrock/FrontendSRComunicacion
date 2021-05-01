import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Cliente/logueo/login/login.component';
import { PrincipalComponent } from './Cliente/logueo/principal/principal.component';
import { CrearUsuarioComponent } from './Cliente/logueo/Usuarios/crear-usuario/crear-usuario.component';
import { ListarUsuarioComponent } from './Cliente/logueo/Usuarios/listar-usuario/listar-usuario.component';


const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'principal', component: PrincipalComponent },
  { path: 'ListarUsuario', component: ListarUsuarioComponent },
  { path: 'Usuario', component: CrearUsuarioComponent },
  { path: 'UsuarioEdit/:id', component: CrearUsuarioComponent },
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

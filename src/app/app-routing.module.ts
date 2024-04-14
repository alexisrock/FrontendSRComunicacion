import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { CorrespondenciaComponent } from './Cliente/logueo/Correspondencia/correspondencia/correspondencia.component';
import { ListarCorrespondenciaComponent } from './Cliente/logueo/Correspondencia/listar-correspondencia/listar-correspondencia.component';
import { LoginComponent } from './Cliente/logueo/login/login.component';
import { PrincipalComponent } from './Cliente/logueo/principal/principal.component';
import { ListarremdemComponent } from './Cliente/logueo/Remdes/listarremdem/listarremdem.component';
import { RemdesComponent } from './Cliente/logueo/Remdes/remdes/remdes.component';
import { CrearUsuarioComponent } from './Cliente/logueo/Usuarios/crear-usuario/crear-usuario.component';
import { ListarUsuarioComponent } from './Cliente/logueo/Usuarios/listar-usuario/listar-usuario.component';


const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'principal', component: PrincipalComponent },
  { path: 'ListarUsuario', component: ListarUsuarioComponent },
  { path: 'Usuario', component: CrearUsuarioComponent },
  { path: 'ListarRemdem', component: ListarremdemComponent },
  { path: 'RemDes', component: RemdesComponent },
  { path: 'ListarCorrespondencia', component: ListarCorrespondenciaComponent },
  { path: 'Correspondencia', component: CorrespondenciaComponent },
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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {CardModule} from 'primeng/card';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import { PrincipalComponent } from './principal/principal.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DropdownModule} from 'primeng/dropdown';
import {PanelModule} from 'primeng/panel';
import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { ListarUsuarioComponent } from './Usuarios/listar-usuario/listar-usuario.component';
import { CrearUsuarioComponent } from './Usuarios/crear-usuario/crear-usuario.component';
import {TableModule} from 'primeng/table';


@NgModule({
  declarations: [
    LoginComponent,
    PrincipalComponent,
    HeaderMenuComponent,
    ListarUsuarioComponent,
    CrearUsuarioComponent,

  ],
  imports: [
    CommonModule,
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    BrowserAnimationsModule,
    PanelModule,
    TableModule,
    DropdownModule

     ]
})
export class LogueoModule { }

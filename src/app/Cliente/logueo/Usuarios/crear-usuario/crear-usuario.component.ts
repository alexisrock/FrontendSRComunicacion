
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import { UsuarioService } from 'src/app/Cliente/Services/usuario.service';
import { Roles } from '../../Interfaces/roles';
import { Usuario } from '../../Interfaces/usuario';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {
  @Input('UsuarioEditar') UsuarioEditar: Usuario;
  @Output('displaychange') displaychange = new EventEmitter();
  public myform: FormGroup;
  public titulo: string;
  public listRoles: Roles[] = [];
  public id: number;
  public verEditar: boolean = false;
  public displaybotton: boolean = false;
  public validation = {
    documento: [
      { type: 'required', message: 'El campo es obligatorio' }
    ],
    username: [
      { type: 'required', message: 'El campo es obligatorio' }
    ],
    password: [
      { type: 'required', message: 'El campo es obligatorio' }
    ],


  }




  constructor(public router: Router, formbuilder: FormBuilder, private readonly messageService: MessageService,
    private readonly Usuarioservices: UsuarioService, private readonly route: ActivatedRoute) {

    this.myform = formbuilder.group({
      documento: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      username: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      idrol: new FormControl('1', Validators.compose([
        Validators.required,
      ])),
    });
    this.Getroles();

    if (this.UsuarioEditar !== undefined) {
      this.displaybotton = true;
      this.showDatos();

    } else {
      this.id = null

      this.displaybotton = false;

    }



  }

  ngOnInit(): void {
    this.showDatos();


  }



  showDatos() {
    if (this.UsuarioEditar !== undefined) {
      this.myform.get('documento').setValue(this.UsuarioEditar.documento);
      this.myform.get('username').setValue(this.UsuarioEditar.username);
      this.myform.get('password').setValue(this.UsuarioEditar.contrasena);
      this.myform.get('idrol').setValue(this.UsuarioEditar.idrol);
      this.titulo = "Editar usuarios";
      this.verEditar = true;
    } else {
      this.displaybotton = true;
      this.titulo = "Usuarios";
      this.verEditar = false;
      this.LimpiarFormulario();
    }

  }

  Getroles() {
    this.Usuarioservices.GetRoles().subscribe(
      data => {
        this.listRoles = data
      });
  }

  atras() {
    this.router.navigateByUrl('ListarUsuario');
  }

  Save() {
    if (this.myform.valid) {
      if (this.UsuarioEditar != undefined) {
        this.updateUser();

      } else {

        this.addUser();
      }
    } else {
      this.addSingle('error', 'Faltan datos por completar');
    }
  }



  addUser() {
    this.Usuarioservices.Usuario.documento = this.myform.value.documento;
    this.Usuarioservices.Usuario.username = this.myform.value.username;
    this.Usuarioservices.Usuario.contrasena = this.myform.value.password;
    this.Usuarioservices.Usuario.idrol = this.myform.value.idrol;
    this.Usuarioservices.Add().subscribe({
      next: (data) => {
        if (data['code'] == 1) {
          this.LimpiarFormulario();
          this.addSingle('success', data['descripcion']);
        } else {
          this.addSingle('error', data['descripcion']);
        }
      }, error: (error) => {
        this.addSingle('error', error.message);
      }
    });
  }

  updateUser() {
    this.Usuarioservices.Usuario.idUser = this.UsuarioEditar.idUser;
    this.Usuarioservices.Usuario.documento = this.myform.value.documento;
    this.Usuarioservices.Usuario.username = this.myform.value.username;
    this.Usuarioservices.Usuario.contrasena = this.myform.value.password;
    this.Usuarioservices.Usuario.idrol = this.myform.value.idrol;
    this.Usuarioservices.update().subscribe(data => {
      if (data['code'] == 1) {
        this.displaychange.emit(true);
      } else {

        this.addSingle('error', data['descripcion']);
      }

    });

  }




  LimpiarFormulario() {
    this.myform.reset();
  }


  addSingle(tipo, mensaje) {
    if (tipo == 'success') {
      this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Usuario creado con exito' });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: mensaje });
    }

  }

}

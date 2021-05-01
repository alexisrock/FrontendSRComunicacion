import { Component, Input, OnInit } from '@angular/core';
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
  public myform: FormGroup;
  public titulo: string;
  public listRoles: Roles[]=[];
  public id: number;
  public validation ={
    documento: [
      {type: 'required', message: 'El campo es obligatorio'}
    ],
    username: [
      {type: 'required', message: 'El campo es obligatorio'}
    ],
    password: [
      {type: 'required', message: 'El campo es obligatorio'}
    ],


  }




  constructor( public router: Router,  formbuilder: FormBuilder,private messageService: MessageService,
    private Usuarioservices: UsuarioService,private route: ActivatedRoute) {

    this.myform = formbuilder.group({
      documento: new FormControl('',Validators.compose([
        Validators.required,
      ])),
      username:  new FormControl('',Validators.compose([
        Validators.required,
      ])),
      password:  new FormControl('',Validators.compose([
        Validators.required,
      ])),
      idrol:  new FormControl('1',Validators.compose([
        Validators.required,
      ])),
    });
    this.Getroles();

    if (this.route.snapshot.params.id!==undefined) {
      this.id = this.route.snapshot.params.id;
      this.AsignarDatosEdit();
      this.showDatos();

      this.titulo = "Editar usuarios";
    }else{
      this.id = null
      this.titulo = "Usuarios";

    }



  }

  ngOnInit(): void {

  }

async AsignarDatosEdit(){

   await   this.Usuarioservices.GetId(this.id);
  }


showDatos(){
  if(this.Usuarioservices.Usuario!==undefined){
    this.myform.get('documento').setValue(this.Usuarioservices.Usuario.documento);
    this.myform.get('username').setValue(this.Usuarioservices.Usuario.username);
    this.myform.get('password').setValue(this.Usuarioservices.Usuario.contrasena);
    this.myform.get('idrol').setValue(this.Usuarioservices.Usuario.idrol);
  }else{

    this.LimpiarFormulario();
  }

}

  Getroles(){
    this.Usuarioservices.GetRoles().subscribe(
      data=>{
        this.listRoles = data
      });
  }

  atras(){
    this.router.navigateByUrl('ListarUsuario');
  }

  Save(){
    if (this.myform.valid) {



      this.Usuarioservices.Usuario.documento = this.myform.value.documento;
      this.Usuarioservices.Usuario.username = this.myform.value.username;
      this.Usuarioservices.Usuario.contrasena = this.myform.value.password;
      this.Usuarioservices.Usuario.idrol = this.myform.value.idrol;
      this.Usuarioservices.Add().subscribe(
        data=>{
         if (data['code']==1) {
           this.LimpiarFormulario();
          this.addSingle('success', data['descripcion']);
         }else{
          this.addSingle('error', data['descripcion']);
         }
        },error=>{
          this.addSingle('error', error.message);
        });


    }else{
      this.addSingle('error', 'Faltan datos por completar');
    }
  }



  LimpiarFormulario(){
  this.myform.reset();
  }


  addSingle(tipo, mensaje) {
    if (tipo=='success') {
      this.messageService.add( {severity:'success', summary:'Service Message', detail:'Usuario creado con exito'});
    }else{
      this.messageService.add({severity:'error', summary:'Error', detail:mensaje});
    }

}

}

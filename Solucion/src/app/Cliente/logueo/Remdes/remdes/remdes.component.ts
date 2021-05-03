import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RemdemService } from 'src/app/Cliente/Services/remdem.service';
import { Remdem } from '../../Interfaces/remdem';
import { Tiporemdes } from '../../Interfaces/tiporemdes';

@Component({
  selector: 'app-remdes',
  templateUrl: './remdes.component.html',
  styleUrls: ['./remdes.component.css']
})
export class RemdesComponent implements OnInit {
  @Input('remdesditar') remdesditar: Remdem;
  @Output('displaychange') displaychange = new EventEmitter();
  public myform: FormGroup;
  public titulo: string;
  public listTiposRedDes: Tiporemdes[]=[];
  public id: number;
  public verEditar: boolean = false;
  public displaybotton: boolean = false;
  public validation ={
    documento: [
      {type: 'required', message: 'El campo es obligatorio'}
    ],
    nombre: [
      {type: 'required', message: 'El campo es obligatorio'}
    ],
    apellidos: [
      {type: 'required', message: 'El campo es obligatorio'}
    ],
    direccion: [
      {type: 'required', message: 'El campo es obligatorio'}
    ],
    telefono: [
      {type: 'required', message: 'El campo es obligatorio'}
    ],


  }

  constructor(public router: Router,  formbuilder: FormBuilder,private messageService: MessageService, public RemdesServices: RemdemService) {

    this.myform = formbuilder.group({
      documento: new FormControl('',Validators.compose([
        Validators.required,
      ])),
      nombre:  new FormControl('',Validators.compose([
        Validators.required,
      ])),
      apellidos:  new FormControl('',Validators.compose([
        Validators.required,
      ])),
      direccion:  new FormControl('',Validators.compose([
        Validators.required,
      ])),
      telefono:  new FormControl('',Validators.compose([
        Validators.required,
      ])),
      idTipoRemDes:  new FormControl('1',Validators.compose([
        Validators.required,
      ])),
    });
    this.GetTipoRemDes();

    if ( this.remdesditar!==undefined) {
      this.displaybotton = true;
         this.showDatos();

       }else{
         this.id = null

           this.displaybotton = false;

       }

   }

  ngOnInit(): void {
 this.showDatos();

  }


showDatos(){
  if( this.remdesditar!==undefined){
    this.myform.get('documento').setValue( this.remdesditar.documento);
    this.myform.get('nombre').setValue( this.remdesditar.nombres);
    this.myform.get('apellidos').setValue( this.remdesditar.apellidos);
    this.myform.get('direccion').setValue( this.remdesditar.direccion);
    this.myform.get('telefono').setValue( this.remdesditar.telefono);
     this.myform.get('idTipoRemDes').setValue( this.remdesditar.idTipoRemDes);
    this.titulo = "Editar Rem / Des";
    this.verEditar = true;
  }else{
    this.displaybotton = true;
    this.titulo = "Rem  / Des";
    this.verEditar = false;
    this.LimpiarFormulario();
  }
}

  GetTipoRemDes(){
    this.RemdesServices.GetTipoRemdem().subscribe(
      data=>{
        this.listTiposRedDes = data;
      });
  }


  Save(){
    if (this.myform.valid) {
      if (this.remdesditar!=undefined) {
        this.update();

      }else{

        this.add();
      }
  }else{
    this.addSingle('error', 'Faltan datos por completar');
  }

  }


  add(){
    this.RemdesServices.remdem.documento = this.myform.value.documento;
    this.RemdesServices.remdem.nombres = this.myform.value.nombre;
    this.RemdesServices.remdem.apellidos = this.myform.value.apellidos;
    this.RemdesServices.remdem.direccion = this.myform.value.direccion;
    this.RemdesServices.remdem.telefono = this.myform.value.telefono;
    this.RemdesServices.remdem.idTipoRemDes = this.myform.value.idTipoRemDes;
    this.RemdesServices.Add().subscribe(
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
  }

  update(){

    this.RemdesServices.remdem.idremitente = this.remdesditar.idremitente;
    this.RemdesServices.remdem.documento = this.myform.value.documento;
    this.RemdesServices.remdem.nombres = this.myform.value.nombre;
    this.RemdesServices.remdem.apellidos = this.myform.value.apellidos;
    this.RemdesServices.remdem.direccion = this.myform.value.direccion;
    this.RemdesServices.remdem.telefono = this.myform.value.telefono;
    this.RemdesServices.remdem.idTipoRemDes = this.myform.value.idTipoRemDes;
    this.RemdesServices.update().subscribe(
      data=>{
        if (data['code']==1) {
          this.displaychange.emit(true);
        }else{

          this.addSingle('error', data['descripcion']);
        }

      });


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


  atras(){
    this.router.navigateByUrl('ListarRemdem');
  }


}

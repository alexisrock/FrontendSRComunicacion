import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/Cliente/Services/usuario.service';
import { Usuario } from '../../Interfaces/usuario';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent  {
public listUsuarios: Usuario[] = [];
first = 0;
rows = 10;
public display: boolean = false;
public userEdit: Usuario;
  constructor(private readonly Usuaruiservices: UsuarioService, private readonly router: Router) {
    this.GetUsuarios();
   }


  GetUsuarios(){
    this.Usuaruiservices.GetyAll().subscribe(
      data=>{

        this.listUsuarios = data;
      }
    );
  }

  Nuevo(){
    this.router.navigateByUrl('Usuario');
  }

  Delete(id){
    this.Usuaruiservices.Delete(id).subscribe(
      data=>{
        if (data['code']==1) {
          this.GetUsuarios();
        }
      });
  }

  Edit(Usuario){
  this.userEdit = Usuario;
  this.display = true;
  }

  closedModal(){
    this.display = false;
    this.GetUsuarios();
  }

  atras(){
    this.router.navigateByUrl('principal');
  }


  next() {
    this.first = this.first + this.rows;
}

prev() {
    this.first = this.first - this.rows;
}

reset() {
    this.first = 0;
}

isLastPage(): boolean {
    return this.listUsuarios ? this.first === (this.listUsuarios.length - this.rows): true;
}

isFirstPage(): boolean {
    return this.listUsuarios ? this.first === 0 : true;
}

}

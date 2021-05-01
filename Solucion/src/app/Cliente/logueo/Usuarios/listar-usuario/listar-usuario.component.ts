import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/Cliente/Services/usuario.service';
import { Usuario } from '../../Interfaces/usuario';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent implements OnInit {
public listUsuarios: Usuario[] = [];
first = 0;
rows = 10;

  constructor(private Usuaruiservices: UsuarioService, private router: Router) {
    this.GetUsuarios();
   }

  ngOnInit(): void {
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

  Edit(Usuarioid){
    this.router.navigate(['UsuarioEdit', Usuarioid]);
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

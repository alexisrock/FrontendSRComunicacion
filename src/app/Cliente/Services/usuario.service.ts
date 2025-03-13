import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Roles } from '../logueo/Interfaces/roles';
import { Usuario } from '../logueo/Interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private readonly http: HttpClient) { }


  public headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});


public Usuario: Usuario={

documento: "",
username: "",
contrasena: "",
idrol: 1
}




    GetyAll() {
      return this.http.get<Usuario[]>(environment.url+'Usuarios/GetAll', {headers: this.headers} );
    }

    GetRoles(){
      return this.http.get<Roles[]>(environment.url+'Roles/GetAll', {headers: this.headers} );
    }

    Add(){
      return this.http.post<Response>(environment.url+'Usuarios/Add', this.Usuario,{headers: this.headers} );
    }

    Delete(id){
      return this.http.delete<Response>(environment.url+'Usuarios/Delete/'+id, {headers: this.headers} );
    }

    update(){
      return this.http.put<Response>(environment.url+'Usuarios/Update/'+this.Usuario.idUser, this.Usuario,{headers: this.headers} );

    }


}

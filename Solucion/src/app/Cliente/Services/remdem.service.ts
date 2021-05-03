import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Remdem } from '../logueo/Interfaces/remdem';
import { Tiporemdes } from '../logueo/Interfaces/tiporemdes';

@Injectable({
  providedIn: 'root'
})
export class RemdemService {

  constructor(private http: HttpClient) { }

  public headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});





public remdem: Remdem={
  idremitente: 1,
  documento: "",
  nombres: "",
  apellidos: "",
  direccion: "",
  telefono:  "",
  idTipoRemDes: 1
  }


  GetAll() {
    return this.http.get<Remdem[]>(environment.url+'RemDes/GetAll', {headers: this.headers} );
  }

  GetTipoRemdem(){
    return this.http.get<Tiporemdes[]>(environment.url+'TipoRemDes/GetAll', {headers: this.headers} );

  }

  Delete(id){
    return this.http.delete<Response>(environment.url+'RemDes/Delete/'+id, {headers: this.headers} );
  }

  Add(){
    return this.http.post<Response>(environment.url+'RemDes/Add', this.remdem,{headers: this.headers} );
  }


  update(){
    return this.http.put<Response>(environment.url+'RemDes/Update/'+this.remdem.idremitente, this.remdem  ,{headers: this.headers} );
  }
}

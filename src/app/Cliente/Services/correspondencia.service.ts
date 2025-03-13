import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Correspondenica, VwCorrespondenica } from '../logueo/Interfaces/correspondenica';

@Injectable({
  providedIn: 'root'
})
export class CorrespondenciaService {


  constructor(private readonly http: HttpClient) { }

  public headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

public idcorrespondencia: string;

  public  correspondencia: Correspondenica = {

      idRemitente: 1,
      idDestinatario: 1,
      rutaArchivo:"",
      observacion: "",
      tipoCorrespondencia:1,

  }


  GetAll() {
    return this.http.get<VwCorrespondenica[]>(environment.url+'Correspondencia/GetAll', {headers: this.headers} );
  }



  Delete(id){
    return this.http.delete<Response>(environment.url+'Correspondencia/Delete/'+id, {headers: this.headers} );
  }

  Add(){
    console.log(JSON.stringify(this.correspondencia))
    return this.http.post<Response>(environment.url+'Correspondencia/Add', this.correspondencia,{headers: this.headers} );
  }


  update(){
    console.log(JSON.stringify(this.correspondencia))
    return this.http.put<Response>(environment.url+'Correspondencia/Update/'+this.idcorrespondencia, this.correspondencia  ,{headers: this.headers} );
  }
}

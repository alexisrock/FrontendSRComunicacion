import { Injectable } from '@angular/core';
import { CookieService } from "ngx-cookie-service";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookies: CookieService) { }


  setIdRol(idrol){
    this.cookies.set('idrol', idrol);
  }

  getIdRol(){
    this.cookies.get('idrol');
  }

  setName(name){
    this.cookies.set('username', name);
  }

  getName(){
    this.cookies.get('username');
  }

  setCedula(documento){
    this.cookies.set('documento', documento);
  }

  getCedula(){
    this.cookies.get('documento');
  }


}

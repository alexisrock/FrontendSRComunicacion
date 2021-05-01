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
    return this.cookies.get('idrol');
  }

  setName(name){
    this.cookies.set('username', name);
  }

  getName(){
    return this.cookies.get('username');
  }

  setCedula(documento){
    this.cookies.set('documento', documento);
  }

  getCedula(){
    return  this.cookies.get('documento');
  }



  logout(): any {
    this.cookies.delete('username');
    this.cookies.delete('documento');
    this.cookies.delete('idrol');
  }


}
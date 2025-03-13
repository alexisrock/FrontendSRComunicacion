import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent  {
public displayusuarios: boolean= false;
public displayremdes: boolean= false;
public displaycorrespondencia: boolean= false;

  constructor(private readonly authservices: AuthService, private readonly router: Router, ) {

    if (this.authservices.getIdRol()=="1") {
      this.displayusuarios = true;
      this.displayremdes=true;
      this.displaycorrespondencia = true;
    }else if(this.authservices.getIdRol()=="2"){
      this.displayremdes=true;
      this.displaycorrespondencia = true;
    }else{
      this.displaycorrespondencia = true;
    }
   }



  ingresar(numero){

    if (numero===1) {
      this.router.navigateByUrl('ListarUsuario');
    }
    else if(numero===2){
      this.router.navigateByUrl('ListarRemdem');
    }else{
      this.router.navigateByUrl('ListarCorrespondencia');
    }


  }
}

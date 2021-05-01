import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
public displayusuarios: boolean= false;
public displayremdes: boolean= false;
public displaycorrespondencia: boolean= false;

  constructor(private authservices: AuthService, private router: Router, ) {

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

  ngOnInit(): void {
  }

  ingresar(numero){

    if (numero===1) {

      this.router.navigateByUrl('ListarUsuario');
    }

  }
}

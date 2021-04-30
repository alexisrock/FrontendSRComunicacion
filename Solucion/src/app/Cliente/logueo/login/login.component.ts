import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NgForm } from '@angular/forms';

import {CardModule} from 'primeng/card';
import { LoginService } from '../../Services/login.service';
import { AuthService } from '../../Services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mensajeError: string;
  public myform: FormGroup;
  constructor( public router: Router,  formbuilder: FormBuilder, public loginservices: LoginService, private authservices: AuthService) {
    this.myform = formbuilder.group({
      idusuario: new FormControl('',Validators.compose([
        Validators.required,
      ])),
      password:  new FormControl('',Validators.compose([
        Validators.required,
      ])),
    });
   }

  ngOnInit(): void {
  }

  login(){
    if (this.myform.valid) {
    this.loginservices.login(this.myform.value.idusuario, this.myform.value.password).subscribe(
      data=>{
        console.log(data['idrol']);
        if (data['idrol']!==null) {
          this.authservices.setIdRol(data['idrol']);
          this.authservices.setCedula(data['documento']);
          this.authservices.setName(data['username']);
          this.router.navigateByUrl('principal');
        }
      });
    }else{
      this.mensajeError = "Tiene campos sin llenar"
      setTimeout(() => {
        this.mensajeError = ""
      }, 3000);
    }

  }



}

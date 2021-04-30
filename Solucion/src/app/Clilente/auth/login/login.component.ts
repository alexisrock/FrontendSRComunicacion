import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../Services/login.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mensajeError: string;
  public myform: FormGroup;
  constructor( public router: Router,  formbuilder: FormBuilder, public loginservices: LoginService ) {
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
    this.loginservices.login(this.myform.value.idusuario, this.myform.value.password)

  }



}

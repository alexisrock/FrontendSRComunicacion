import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CardModule} from 'primeng/card';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'primeng/api';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    FormBuilder,
     SharedModule
  ]
})
export class AuthModule { }

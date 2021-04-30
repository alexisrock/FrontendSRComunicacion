import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardModule } from 'primeng/card';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { LoginService } from './Clilente/Services/login.service';




export interface AppConfig{
  apiEndpoint: string;
};

const APP_CONFIG_VALUE: AppConfig = {
apiEndpoint: "https://localhost:44379/api/"
};

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

  ],
  providers: [
    LoginService,
    {provide: APP_CONFIG, useValue: APP_CONFIG_VALUE},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

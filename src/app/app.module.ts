import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, HttpHeaders, HttpRequest} from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LogueoModule } from './Cliente/logueo/logueo.module';
import { MessageService } from 'primeng/api';

import { PanelModule } from 'primeng/panel';



@NgModule({
  declarations: [
    AppComponent,

  ],exports:[

  ],
  imports: [
    BrowserModule ,
    AppRoutingModule,
    LogueoModule,
    HttpClientModule,
    PanelModule

  ],
  providers: [MessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

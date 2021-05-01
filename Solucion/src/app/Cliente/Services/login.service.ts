import { forwardRef, Inject, Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders} from '@angular/common/http';

import { map } from 'rxjs/operators';
import { CookieService } from "ngx-cookie-service";

import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }


  login(user: string, password: string) {

    const headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json',

  });

    return this.http.post(environment.url+'Usuarios/Login?user='+user+'&pass='+password, {},{headers: headers} );

  }
}

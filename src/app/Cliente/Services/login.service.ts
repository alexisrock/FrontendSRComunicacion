import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private readonly http: HttpClient) { }


  login(user: string, password: string) {

    const headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json',

  });

    return this.http.post(environment.url+'Usuarios/Login?user='+user+'&pass='+password, {},{headers: headers} );

  }
}

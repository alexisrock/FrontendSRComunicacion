import { forwardRef, Inject, Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import { APP_CONFIG, AppConfig } from 'src/app/app.module';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,   @Inject(forwardRef(() => APP_CONFIG)) private config: AppConfig ,) { }



  login(user: string, password: string) {
    const headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    const req = new HttpRequest('POST', this.config.apiEndpoint + 'Usuarios/Login', { idusuario:user,  password:password }, { headers: headers });
    return this.http.request(req).pipe(map((datos: HttpResponse<{}>)=>{
        if (datos.status===200) {
          return datos.body['data'];
        }

    }));

  }
}

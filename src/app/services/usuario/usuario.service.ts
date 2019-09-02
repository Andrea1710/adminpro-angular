import {Injectable} from '@angular/core';
import {Usuario} from 'src/app/models/usuario.model';
import {map} from 'rxjs/operators';

import {URL_SERVICIOS} from './../../config/config';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class UsuarioService {
  constructor(public http: HttpClient) {}

  login(usuario: Usuario, recordar: boolean = false) {
    if (recordar) localStorage.setItem('email', usuario.email);
    else localStorage.removeItem('email');

    const url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario).pipe(
      map((res: any) => {
        localStorage.setItem('id', res.id);
        localStorage.setItem('token', res.token);
        localStorage.setItem('token', res.token);
        localStorage.setItem('usuario', JSON.stringify(res.usuario));

        return true;
      })
    );
  }

  crearUsuario(usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario).pipe(
      map((res: any) => {
        swal('Usuario Creado!', usuario.email, 'success');
        return res.usuario;
      })
    );
  }
}

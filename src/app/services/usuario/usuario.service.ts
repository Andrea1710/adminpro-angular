import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {map, catchError} from 'rxjs/operators';

import {URL_SERVICIOS} from './../../config/config';
import {SubirArchivoService} from './../subir-archivo/subir-archivo.service';
import {Usuario} from 'src/app/models/usuario.model';

@Injectable({providedIn: 'root'})
export class UsuarioService {
  usuario: Usuario;
  token: string;
  menu: any[] = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    public subirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage();
  }

  estaLogeado() {
    return this.token.length > 5 ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  cambiarImagen(archivo: File, id: string) {
    this.subirArchivoService
      .subirArchivo(archivo, 'usuarios', id)
      .then((res: any) => {
        this.usuario.img = res.usuarioActualizado.img;
        swal('Imagen Actualizada!', this.usuario.nombre, 'success');
        this.guardarStorage(id, this.token, this.usuario, this.menu);
      })
      .catch(err => console.log(err));
  }

  loginGoogle(token: string) {
    let url = URL_SERVICIOS + '/login/google';

    return this.http.post(url, {token: token}).pipe(
      map((res: any) => {
        this.guardarStorage(res.id, res.token, res.usuario, res.menu);
        return true;
      })
    );
  }

  login(usuario: Usuario, recordar: boolean = false) {
    if (recordar) localStorage.setItem('email', usuario.email);
    else localStorage.removeItem('email');

    const url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario).pipe(
      map((res: any) => {
        this.guardarStorage(res.id, res.token, res.usuario, res.menu);
        return true;
      }),
      catchError(err => {
        swal('Error en el login', err.error.mensaje, 'error');
        throw err;
      })
    );
  }

  crearUsuario(usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario).pipe(
      map((res: any) => {
        swal('Usuario Creado!', usuario.email, 'success');
        return res.usuario;
      }),
      catchError(err => {
        swal(err.error.mensaje, err.error.errors.message, 'error');
        throw err;
      })
    );
  }

  actualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put(url, usuario).pipe(
      map((res: any) => {
        if (usuario._id === this.usuario._id) {
          this.guardarStorage(
            this.usuario._id,
            this.token,
            res.usuario,
            this.menu
          );
        }

        swal('Usuario actualizado!', usuario.nombre, 'success');
        return true;
      }),
      catchError(err => {
        swal(err.error.mensaje, err.error.errors.message, 'error');
        throw err;
      })
    );
  }

  cargarUsuarios(desde: number = 0) {
    const url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get(url);
  }

  buscarUsuarios(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/colleccion/usuarios/' + termino;

    return this.http.get(url);
  }

  borrarUsuario(id: string) {
    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;

    return this.http.delete(url).pipe(
      map(res => {
        swal(
          'Usuario borrado!',
          'El Usuario ha sido eliminado correctamente',
          'success'
        );
        return true;
      })
    );
  }

  logout() {
    this.usuario = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }
}

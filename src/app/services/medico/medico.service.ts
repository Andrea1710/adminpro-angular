import {Medico} from './../../models/medico.model';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {map} from 'rxjs/internal/operators/map';
import {UsuarioService} from 'src/app/services/usuario/usuario.service';
import {URL_SERVICIOS} from './../../config/config';

@Injectable({
  providedIn: 'root',
})
export class MedicoService {
  totalMedicos: number = 0;

  constructor(public http: HttpClient, public usuarioService: UsuarioService) {}

  cargarMedicos() {
    let url = URL_SERVICIOS + '/medico';

    return this.http.get(url).pipe(
      map((res: any) => {
        this.totalMedicos = res.total;
        return res.medicos;
      })
    );
  }

  buscarMedicos(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/colleccion/medicos/' + termino;
    return this.http.get(url);
  }

  borrarMedico(id: string) {
    let url = URL_SERVICIOS + '/medico/' + id;
    url += '?token=' + this.usuarioService.token;

    return this.http.delete(url).pipe(
      map((res: any) => {
        swal(
          'Médico Borrado!',
          'El Médico ha sido borrado correctamente',
          'success'
        );
        return res;
      })
    );
  }

  guardarMedico(medico: Medico) {
    let url = URL_SERVICIOS + '/medico';
    url += '?token=' + this.usuarioService.token;

    return this.http.post(url, medico).pipe(
      map((res: any) => {
        swal('Médico Creado!', medico.nombre, 'success');
        return res.medico;
      })
    );
  }
}

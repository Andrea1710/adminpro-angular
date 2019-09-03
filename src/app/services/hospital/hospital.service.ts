import {Hospital} from './../../models/hospital.model';
import {UsuarioService} from './../usuario/usuario.service';
import {URL_SERVICIOS} from './../../config/config';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  totalhospitales: number = 0;
  constructor(public http: HttpClient, public usuarioService: UsuarioService) {}

  cargarHospitales() {
    const url = URL_SERVICIOS + '/hospital';
    return this.http.get(url).pipe(
      map((res: any) => {
        this.totalhospitales = res.total;
        return res.hospitales;
      })
    );
  }

  obtenerHospital(id: string) {
    const url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get(url).pipe(map((res: any) => res.hospital));
  }

  borrarHospital(id: string) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this.usuarioService.token;
    return this.http
      .delete(url)
      .pipe(
        map(res =>
          swal(
            'Hospital Borrado!',
            'Hospital eliminado correctamente',
            'success'
          )
        )
      );
  }

  crearHospital(nombre: string) {
    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this.usuarioService.token;
    return this.http
      .post(url, {nombre: nombre})
      .pipe(map((res: any) => res.hospital));
  }

  buscarHospital(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/colleccion/hospitales/' + termino;
    return this.http.get(url);
  }

  actualizarHospital(hospital: Hospital) {
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this.usuarioService.token;
    return this.http.put(url, hospital).pipe(
      map((res: any) => {
        swal('Hospital Actualizado!', hospital.nombre, 'success');
        return res.hospital;
      })
    );
  }
}

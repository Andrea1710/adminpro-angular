import {Hospital} from './../../models/hospital.model';
import {Medico} from './../../models/medico.model';
import {URL_SERVICIOS} from './../../config/config';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Usuario} from 'src/app/models/usuario.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [],
})
export class BusquedaComponent implements OnInit {
  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];

  constructor(public route: ActivatedRoute, public http: HttpClient) {
    route.params.subscribe(params => {
      const termino = params['termino'];
      this.buscar(termino);
    });
  }

  ngOnInit() {}

  buscar(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/todo/' + termino;

    this.http.get(url).subscribe((res: any) => {
      this.hospitales = res.hospitales;
      this.medicos = res.medicos;
      this.usuarios = res.usuarios;
    });
  }
}

import {MedicoService} from './../../services/medico/medico.service';
import {Medico} from './../../models/medico.model';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [],
})
export class MedicosComponent implements OnInit {
  medicos: any[] = [];

  constructor(public medicoService: MedicoService) {}

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this.medicoService
      .cargarMedicos()
      .subscribe(medicos => (this.medicos = medicos));
  }

  buscarMedico(termino: string) {
    if (!termino.length) {
      this.cargarMedicos();
      return;
    }

    this.medicoService
      .buscarMedicos(termino)
      .subscribe((medicos: any) => (this.medicos = medicos.medicos));
  }

  borrarMedico(medico: Medico) {
    this.medicoService
      .borrarMedico(medico._id)
      .subscribe(() => this.cargarMedicos());
  }
}

import {Router} from '@angular/router';
import {Medico} from './../../models/medico.model';
import {HospitalService} from './../../services/hospital/hospital.service';
import {Hospital} from './../../models/hospital.model';
import {MedicoService} from './../../services/medico/medico.service';
import {NgForm} from '@angular/forms';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [],
})
export class MedicoComponent implements OnInit {
  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(
    public medicoService: MedicoService,
    public hospitalService: HospitalService,
    public router: Router
  ) {}

  ngOnInit() {
    this.hospitalService
      .cargarHospitales()
      .subscribe(hospitales => (this.hospitales = hospitales));
  }

  guardarMedico(form: NgForm) {
    if (form.invalid) return;

    this.medicoService.guardarMedico(this.medico).subscribe(medico => {
      this.medico._id = medico._id;
      this.router.navigate(['/medico/', medico._id]);
    });
  }

  cambioHospital(id: string) {
    this.hospitalService
      .obtenerHospital(id)
      .subscribe(hospital => (this.hospital = hospital));
  }
}

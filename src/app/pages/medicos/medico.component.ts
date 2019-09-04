import {Router, ActivatedRoute} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {HospitalService} from './../../services/hospital/hospital.service';
import {MedicoService} from './../../services/medico/medico.service';
import {ModalUploadService} from './../../components/modal-upload/modal-upload.service';
import {Medico} from './../../models/medico.model';
import {Hospital} from './../../models/hospital.model';

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
    public modalUploadService: ModalUploadService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    route.params.subscribe(params => {
      const id = params['id'];

      if (id !== 'nuevo') this.cargarMedico(id);
    });
  }

  ngOnInit() {
    this.hospitalService
      .cargarHospitales()
      .subscribe(hospitales => (this.hospitales = hospitales));

    this.modalUploadService.notificacion.subscribe(
      res => (this.medico.img = res.medico.img)
    );
  }

  cargarMedico(id: string) {
    this.medicoService.cargarMedico(id).subscribe(medico => {
      this.medico = medico;
      this.medico.hospital = medico.hospital._id;
      this.cambioHospital(this.medico.hospital);
    });
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

  cambiarFoto() {
    this.modalUploadService.mostrarModal('medicos', this.medico._id);
  }
}

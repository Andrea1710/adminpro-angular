import {ModalUploadService} from './modal-upload.service';
import {SubirArchivoService} from './../../services/subir-archivo/subir-archivo.service';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: [],
})
export class ModalUploadComponent implements OnInit {
  imagenSubir: File;
  imagenTemporal;

  constructor(
    public subirArchivoService: SubirArchivoService,
    public modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {}

  cerrarModal() {
    this.imagenTemporal = null;
    this.imagenSubir = null;

    this.modalUploadService.ocultarModal();
  }

  subirImagen() {
    this.subirArchivoService
      .subirArchivo(
        this.imagenSubir,
        this.modalUploadService.tipo,
        this.modalUploadService.id
      )
      .then(res => {
        this.modalUploadService.notificacion.emit(res);
        this.cerrarModal();
      })
      .catch(err => console.log('Error en la carga...'));
  }

  seleccionImagen(archivo: File | any) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0) {
      swal(
        'Sólo Imagenes!',
        'El Archivo seleccionado no es una Imagen',
        'error'
      );
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    const reader = new FileReader();
    const urlImagenTemporal = reader.readAsDataURL(archivo);

    reader.onloadend = () => (this.imagenTemporal = reader.result);
  }
}

import {Component, OnInit} from '@angular/core';

import {Usuario} from 'src/app/models/usuario.model';
import {UsuarioService} from 'src/app/services/service.index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [],
})
export class ProfileComponent implements OnInit {
  usuario: Usuario;
  imagenSubir: File;
  imagenTemporal;

  constructor(public usuarioService: UsuarioService) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit() {}

  guardar(usuario: Usuario) {
    this.usuario.nombre = usuario.nombre;
    if (!this.usuario.google) this.usuario.email = usuario.email;

    this.usuarioService.actualizarUsuario(this.usuario).subscribe();
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

  cambiarImagen() {
    this.usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);
  }
}

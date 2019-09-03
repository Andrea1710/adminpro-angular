import {ModalUploadService} from './../../components/modal-upload/modal-upload.service';
import {Component, OnInit} from '@angular/core';
import {Usuario} from 'src/app/models/usuario.model';
import {UsuarioService} from 'src/app/services/service.index';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [],
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = false;

  constructor(
    public usuarioService: UsuarioService,
    public modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {
    this.cargarUsuarios();
    this.modalUploadService.notificacion.subscribe(res =>
      this.cargarUsuarios()
    );
  }

  mostrarModal(id: string) {
    this.modalUploadService.mostrarModal('usuarios', id);
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde).subscribe((res: any) => {
      this.totalRegistros = res.total;
      this.usuarios = res.usuarios;
      this.cargando = false;
    });
  }

  cambiarDesde(valor: number) {
    const desde = this.desde + valor;
    if (desde >= this.totalRegistros) return;
    if (desde < 0) return;
    this.desde += valor;

    this.cargarUsuarios();
  }

  buscarUsuario(termino: string) {
    if (!termino.length) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;
    this.usuarioService.buscarUsuarios(termino).subscribe((res: any) => {
      this.usuarios = res.usuarios;
      this.cargando = false;
    });
  }

  borrarUsuario(usuario: Usuario) {
    if (usuario._id === this.usuarioService.usuario._id) {
      swal(
        'No puede borrar el Usuario!',
        'No se puede borrar a si mismo',
        'error'
      );
      return;
    }

    swal({
      title: '¿Está seguro?',
      text: 'Está a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(borrar => {
      if (borrar) {
        this.usuarioService
          .borrarUsuario(usuario._id)
          .subscribe((borrado: boolean) => {
            console.log(borrado);
            this.cargarUsuarios();
          });
      }
    });
  }

  guardarUsuario(usuario: Usuario) {
    this.usuarioService.actualizarUsuario(usuario).subscribe();
  }
}

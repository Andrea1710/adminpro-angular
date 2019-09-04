import {UsuarioService} from 'src/app/services/usuario/usuario.service';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class SidebarService {
  menu: any[] = [];

  constructor(public usuarioService: UsuarioService) {}

  cargarMenu() {
    this.menu = this.usuarioService.menu;
  }
}

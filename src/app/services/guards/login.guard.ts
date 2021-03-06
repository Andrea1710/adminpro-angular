import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';

import {UsuarioService} from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(public usuarioService: UsuarioService, public router: Router) {}

  canActivate(): boolean {
    if (this.usuarioService.estaLogeado()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}

import {LoginGuard} from './guards/login.guard';
import {AdminGuard} from './guards/admin.guard';
import {MedicoService} from './medico/medico.service';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import {ModalUploadService} from './../components/modal-upload/modal-upload.service';
import {HospitalService} from './hospital/hospital.service';

import {
  SettingsService,
  SidebarService,
  SharedService,
  UsuarioService,
  SubirArchivoService,
  VerificaTokenGuard,
} from './service.index';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    SubirArchivoService,
    ModalUploadService,
    HospitalService,
    MedicoService,
    AdminGuard,
    LoginGuard,
    VerificaTokenGuard,
  ],
})
export class ServiceModule {}

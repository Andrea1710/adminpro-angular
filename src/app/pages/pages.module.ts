import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {ChartsModule} from 'ng2-charts';
import {PipesModule} from '../pipes/pipes.module';

// Routes
import {PAGES_ROUTES} from './pages.routes';

import {PagesComponent} from './pages.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProgressComponent} from './progress/progress.component';
import {Graficas1Component} from './graficas1/graficas1.component';
import {ModalUploadComponent} from './../components/modal-upload/modal-upload.component';

// Temporary
import {IncrementadorComponent} from '../components/incrementador/incrementador.component';
import {GraficoDoughnutComponent} from '../components/grafico-doughnut/grafico-doughnut.component';
import {AccountSettingsComponent} from './account-settings/account-settings.component';
import {PromesasComponent} from './promesas/promesas.component';
import {RxjsComponent} from './rxjs/rxjs.component';
import {ProfileComponent} from './profile/profile.component';
import {UsuariosComponent} from './usuarios/usuarios.component';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    IncrementadorComponent,
    GraficoDoughnutComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    ProfileComponent,
    UsuariosComponent,
    ModalUploadComponent,
  ],
  exports: [DashboardComponent, ProgressComponent, Graficas1Component],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ChartsModule,
    PAGES_ROUTES,
    PipesModule,
  ],
})
export class PagesModule {}

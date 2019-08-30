import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { ChartsModule } from "ng2-charts";

// Routes
import { PAGES_ROUTES } from "./pages.routes";

import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";

// Temporary
import { IncrementadorComponent } from "../components/incrementador/incrementador.component";
import { GraficoDoughnutComponent } from "../components/grafico-doughnut/grafico-doughnut.component";
import { CommonModule } from "@angular/common";
import { AccountSettingsComponent } from './account-settings/account-settings.component';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    IncrementadorComponent,
    GraficoDoughnutComponent,
    AccountSettingsComponent
  ],
  exports: [DashboardComponent, ProgressComponent, Graficas1Component],
  imports: [CommonModule, SharedModule, FormsModule, ChartsModule, PAGES_ROUTES]
})
export class PagesModule {}

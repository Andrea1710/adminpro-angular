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

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    IncrementadorComponent,
    GraficoDoughnutComponent
  ],
  exports: [DashboardComponent, ProgressComponent, Graficas1Component],
  imports: [SharedModule, FormsModule, ChartsModule, PAGES_ROUTES]
})
export class PagesModule {}

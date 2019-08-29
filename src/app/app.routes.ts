import { RegisterComponent } from "./login/register.component";
import { PagesComponent } from "./pages/pages.component";
import { PagenotfoundComponent } from "./shared/pagenotfound/pagenotfound.component";
import { Routes } from "@angular/router";

import { ProgressComponent } from "./pages/progress/progress.component";
import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { Graficas1Component } from "./pages/graficas1/graficas1.component";

export const appRoutes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "progress", component: ProgressComponent },
      { path: "graficas1", component: Graficas1Component },
      { path: "", redirectTo: "/dashboard", pathMatch: "full" }
    ]
  },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "**", component: PagenotfoundComponent }
];

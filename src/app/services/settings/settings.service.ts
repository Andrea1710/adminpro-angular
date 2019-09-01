import { Injectable, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";

interface Ajustes {
  temaUrl: string;
  tema: string;
}

@Injectable({ providedIn: "root" })
export class SettingsService {
  ajustes: Ajustes = {
    temaUrl: "assets/css/colors/default.css",
    tema: "default"
  };

  constructor(@Inject(DOCUMENT) private document) {
    this.cargarAjustes();
  }

  guardarAjustes() {
    localStorage.setItem("ajustes", JSON.stringify(this.ajustes));
  }

  cargarAjustes() {
    if (localStorage.getItem("ajustes")) {
      this.ajustes = JSON.parse(localStorage.getItem("ajustes"));
      this.aplicarTema(this.ajustes.tema);
    } else this.aplicarTema(this.ajustes.tema);
  }

  aplicarTema(tema: string) {
    const temaUrl = `assets/css/colors/${tema}.css`;
    this.document.getElementById("theme").setAttribute("href", temaUrl);
    this.ajustes = { tema: tema, temaUrl: temaUrl };
    this.guardarAjustes();
  }
}

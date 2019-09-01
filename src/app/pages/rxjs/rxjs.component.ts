import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subscriber, Subscription } from "rxjs";
import { map, filter } from "rxjs/operators";

@Component({
  selector: "app-rxjs",
  templateUrl: "./rxjs.component.html",
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor() {
    this.subscription = this.regresaObservable().subscribe(
      numero => console.log("Subs", numero),
      error => console.error("Error en el obs", error),
      () => console.log("El observador terminó")
    );
  }

  ngOnInit() {}

  regresaObservable(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      let contador = 0;

      let intervalo = setInterval(() => {
        contador++;

        const salida = {
          valor: contador
        };

        observer.next(salida);
      }, 1000);
    }).pipe(
      map(res => res.valor),
      filter((valor, index) => {
        if (valor % 2 === 1) return true;
        else return false;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

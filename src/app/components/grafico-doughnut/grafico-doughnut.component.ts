import { Component, OnInit, Input } from "@angular/core";
import { Label, MultiDataSet } from "ng2-charts";
import { ChartType } from "chart.js";

@Component({
  selector: "app-grafico-doughnut",
  templateUrl: "./grafico-doughnut.component.html",
  styles: []
})
export class GraficoDoughnutComponent implements OnInit {
  @Input("chartLabels") doughnutChartLabels: Label[] = [];
  @Input("chartData") doughnutChartData: MultiDataSet = [];
  @Input("chartType") doughnutChartType: ChartType;

  constructor() {}

  ngOnInit() {}
}

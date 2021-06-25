import { Component, OnInit } from '@angular/core';


export interface ForeCast {
  date: string;
  maxTemp: number;
  minTemp: number;
  humidity: string;
}

const DATE_DATA: ForeCast[] = [
  {date: '2021-25-06', maxTemp: 26, minTemp: -10, humidity: "60%"},
  {date: '2021-24-06', maxTemp: 26, minTemp: -10, humidity: "60%"},
  {date: '2021-23-06', maxTemp: 26, minTemp: -10, humidity: "60%"},
  {date: '2021-22-06', maxTemp: 26, minTemp: -10, humidity: "60%"},
  {date: '2021-21-06', maxTemp: 26, minTemp: -10, humidity: "60%"},

  {date: '2021-20-06', maxTemp: 26, minTemp: -10, humidity: "60%"},

  {date: '2021-19-06', maxTemp: 26, minTemp: -10, humidity: "60%"},
];


@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {

  displayedColumns: string[] = ['DATE', 'MAXIMUM TEMP', 'MINIMUM TEMP', 'HUMIDITY'];
  dataSource = DATE_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}

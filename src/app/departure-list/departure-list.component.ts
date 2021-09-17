import { Component, Input, OnInit } from '@angular/core';
import { MonitoredStation } from '../shared/models/monitored-station.model';

@Component({
  selector: 'app-departure-list',
  templateUrl: './departure-list.component.html',
  styleUrls: ['./departure-list.component.scss'],
})
export class DepartureListComponent implements OnInit {
  @Input() monitoredStation: MonitoredStation;

  constructor() { }

  ngOnInit() {}

  get skeletons(): Array<number> {
    return Array(this.monitoredStation.departureCount);
  }
}

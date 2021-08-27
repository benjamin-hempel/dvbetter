import { Component, Input, OnInit } from '@angular/core';

import { MonitoredStation } from '../shared/models/monitored-station.model';

@Component({
  selector: 'app-departure-card',
  templateUrl: './departure-card.component.html',
  styleUrls: ['./departure-card.component.scss'],
})
export class DepartureCardComponent implements OnInit {
  @Input() monitoredStation: MonitoredStation;

  constructor() { }

  ngOnInit() {}

  get skeletons(): Array<number> {
    return Array(this.monitoredStation.departureCount);
  }
}

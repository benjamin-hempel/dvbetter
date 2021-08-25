import { Component, Input, OnInit } from '@angular/core';
import * as dvb from 'dvbjs';

@Component({
  selector: 'app-departure-card',
  templateUrl: './departure-card.component.html',
  styleUrls: ['./departure-card.component.scss'],
})
export class DepartureCardComponent implements OnInit {
  @Input() departures: dvb.IMonitor[];
  @Input() departureCount: number;

  constructor() { }

  ngOnInit() {}

  get skeletons(): Array<number> {
    return Array(this.departureCount);
  }
}

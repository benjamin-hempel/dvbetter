import { Component, Input, OnInit } from '@angular/core';
import * as dvb from 'dvbjs';

@Component({
  selector: 'app-departure-item',
  templateUrl: './departure-item.component.html',
  styleUrls: ['./departure-item.component.scss'],
})
export class DepartureItemComponent implements OnInit {
  @Input() departure: dvb.IMonitor;

  constructor() { }

  ngOnInit() {}

  get departureTime(): string {
    if(this.departure.arrivalTimeRelative === 0) {
      return 'now';
    }

    if(this.departure.arrivalTimeRelative < 0) {
      return Math.abs(this.departure.arrivalTimeRelative) + ' min ago';
    }

    return this.departure.arrivalTimeRelative + ' min';
  }
}

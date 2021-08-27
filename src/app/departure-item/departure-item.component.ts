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

    if(this.departure.arrivalTimeRelative > 30) {
      let delimiter = ':';
      const minutes = this.departure.arrivalTime.getMinutes();

      if(minutes < 10) {
        delimiter = ':0';
      }

      return this.departure.arrivalTime.getHours() + delimiter + minutes;
    }

    return this.departure.arrivalTimeRelative + ' min';
  }

  get delay(): string {
    if(this.departure.delayTime === 0) {
      return 'on time';
    }

    if(this.departure.delayTime < 0) {
      return Math.abs(this.departure.delayTime) + ' min early';
    }

    return this.departure.delayTime + ' min late';
  }
}

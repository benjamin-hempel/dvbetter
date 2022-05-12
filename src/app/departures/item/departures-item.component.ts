import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as dvb from 'dvbjs';

@Component({
  selector: 'app-departures-item',
  templateUrl: './departures-item.component.html',
  styleUrls: ['./departures-item.component.scss'],
})
export class DeparturesItemComponent implements OnInit {
  @Input() departure: dvb.IMonitor;

  constructor(private translateService: TranslateService) { }

  ngOnInit() {}

  get departureTime(): string {
    if(this.departure.arrivalTimeRelative === 0) {
      return this.translateService.instant('departures.arrival-times.now');
    }

    if(this.departure.arrivalTimeRelative < 0) {
      return this.translateService.instant('departures.arrival-times.min-ago', {count: Math.abs(this.departure.arrivalTimeRelative)});
    }

    if(this.departure.arrivalTimeRelative > 30) {
      let delimiter = ':';
      const minutes = this.departure.arrivalTime.getMinutes();

      if(minutes < 10) {
        delimiter = ':0';
      }

      return this.departure.arrivalTime.getHours() + delimiter + minutes;
    }

    return this.translateService.instant('departures.arrival-times.min', {count: this.departure.arrivalTimeRelative});
  }

  get delay(): string {
    if(this.departure.state === 'Cancelled') {
      return this.translateService.instant('departures.delays.cancelled');
    }

    if(this.departure.delayTime === 0) {
      return this.translateService.instant('departures.delays.on-time');
    }

    if(this.departure.delayTime < 0) {
      return this.translateService.instant('departures.delays.early', {count: Math.abs(this.departure.delayTime)});
    }

    return this.translateService.instant('departures.delays.late', {count: this.departure.delayTime});
  }
}

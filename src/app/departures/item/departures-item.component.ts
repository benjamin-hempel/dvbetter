import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Departure } from 'src/app/shared/models/departure.model';

@Component({
  selector: 'app-departures-item',
  templateUrl: './departures-item.component.html',
  styleUrls: ['./departures-item.component.scss'],
})
export class DeparturesItemComponent implements OnInit {
  @Input() departure: Departure;

  constructor(private translateService: TranslateService) { }

  ngOnInit() {}

  get departureTime(): string {
    if(this.departure.relativeArrival === 0) {
      return this.translateService.instant('departures.arrival-times.now');
    }

    if(this.departure.relativeArrival < 0) {
      return this.translateService.instant('departures.arrival-times.min-ago', {count: Math.abs(this.departure.relativeArrival)});
    }

    if(this.departure.relativeArrival > 30) {
      let delimiter = ':';
      const minutes = this.departure.arrival.getMinutes();

      if(minutes < 10) {
        delimiter = ':0';
      }

      return this.departure.arrival.getHours() + delimiter + minutes;
    }

    return this.translateService.instant('departures.arrival-times.min', {count: this.departure.relativeArrival});
  }

  get delay(): string {
    if(this.departure.isCancelled) {
      return this.translateService.instant('departures.delays.cancelled');
    }

    if(this.departure.relativeDelay === 0) {
      return this.translateService.instant('departures.delays.on-time');
    }

    if(this.departure.relativeDelay < 0) {
      return this.translateService.instant('departures.delays.early', {count: Math.abs(this.departure.relativeDelay)});
    }

    return this.translateService.instant('departures.delays.late', {count: this.departure.relativeDelay});
  }
}

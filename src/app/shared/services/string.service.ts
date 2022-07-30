import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Departure } from '../models/departure.model';

@Injectable({
  providedIn: 'root'
})
export class StringService {
  constructor(private translateService: TranslateService) { }

  getDepartureTime(departure: Departure): string {
    if(departure.relativeArrival === 0) {
      return this.translateService.instant('departures.arrival-times.now');
    }

    if(departure.relativeArrival < 0) {
      return this.translateService.instant('departures.arrival-times.min-ago', { count: Math.abs(departure.relativeArrival) });
    }

    if(departure.relativeArrival > 30) {
      const hours = departure.arrival.getHours();
      const minutes = departure.arrival.getMinutes();
      return minutes < 10 ? hours + ':0' + minutes : hours + ':' + minutes;
    }

    return this.translateService.instant('departures.arrival-times.min', { count: departure.relativeArrival });
  }

  getDelay(departure: Departure): string {
    if(departure.isCancelled) {
      return this.translateService.instant('departures.delays.cancelled');
    }

    if(departure.relativeDelay === 0) {
      return this.translateService.instant('departures.delays.on-time');
    }

    if(departure.relativeDelay < 0) {
      return this.translateService.instant('departures.delays.early', { count: Math.abs(departure.relativeDelay) });
    }

    return this.translateService.instant('departures.delays.late', { count: departure.relativeDelay });
  }
}

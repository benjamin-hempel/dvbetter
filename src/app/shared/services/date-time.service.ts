import { Injectable } from '@angular/core';
import { differenceInSeconds, differenceInMinutes } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {
  constructor() { }

  getSecondsElapsed(start: Date): number {
    return differenceInSeconds(new Date(), start);
  }

  getMinutesFromNow(date: Date): number {
    return differenceInMinutes(date, new Date());
  }
}

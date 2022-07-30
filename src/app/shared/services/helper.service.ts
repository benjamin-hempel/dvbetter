import { Injectable } from '@angular/core';
import { differenceInSeconds } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  constructor() { }

  getSecondsElapsed(start: Date): number {
    return differenceInSeconds(new Date(), start);
  }
}

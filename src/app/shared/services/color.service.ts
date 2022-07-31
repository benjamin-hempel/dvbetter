import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  getDelayColor(relativeArrival: number, relativeDelay: number, isCancelled: boolean): string {
    switch(true) {
      case relativeArrival < 0: return 'color-departed';
      case isCancelled: return 'color-cancelled';
      case relativeDelay < -2: return 'color-early';
      case relativeDelay < 0: return 'color-slightly-early';
      case relativeDelay === 0: return 'color-on-time';
      case relativeDelay < 3: return 'color-slightly-late';
      case relativeDelay < 5: return 'color-late';
      case relativeDelay < 10: return 'color-very-late';
      default: return 'color-cancelled';
    }
  }
}

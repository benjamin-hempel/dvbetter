import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  @Input() updateCounterTimestamp: Date;
  @Input() isActive: boolean;
  updateCounterSeconds = 0;

  updateInterval: NodeJS.Timeout;
  updateCounterInterval: NodeJS.Timeout;

  constructor() { }

  ngOnInit() {
    this.updateCounterInterval = setInterval(() => {
      this.computeUpdateCounter();
    }, 500);
  }

  computeUpdateCounter(): void {
    if(this.isActive) {
      this.updateCounterSeconds =
        Math.floor((new Date().getTime() - this.updateCounterTimestamp.getTime()) / 1000);
    }
  }
}

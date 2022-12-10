import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DateTimeService } from '../../services/date-time.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  @Input() start: Date;
  @Input() update: boolean;
  @Input() clickable: boolean;
  @Input() updating: boolean;

  value = 0;

  updateInterval: NodeJS.Timeout;

  constructor(private dateTimeService: DateTimeService) { }

  ngOnInit() {
    this.updateInterval = setInterval(() => {
      this.compute();
    }, 500);
  }

  compute(): void {
    if(this.update) {
      this.value = this.start ? this.dateTimeService.getSecondsElapsed(this.start) : 0;
    }
  }
}

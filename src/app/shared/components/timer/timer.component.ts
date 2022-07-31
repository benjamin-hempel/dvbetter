import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  @Input() start: Date;
  @Input() update: boolean;
  @Input() clickable: boolean;

  value = 0;

  updateInterval: NodeJS.Timeout;

  constructor(private helperService: HelperService) { }

  ngOnInit() {
    this.updateInterval = setInterval(() => {
      this.compute();
    }, 500);
  }

  compute(): void {
    if(this.update) {
      this.value = this.start ? this.helperService.getSecondsElapsed(this.start) : 0;
    }
  }
}

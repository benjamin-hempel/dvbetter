import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  @Input() start: Date;
  @Input() interval: number;
  @Input() update: boolean;
  @Input() clickable: boolean;
  @Output() elapsed = new EventEmitter();

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
      this.value = this.helperService.getSecondsElapsed(this.start);

      if(this.value > 0 && this.value % this.interval === 0) {
        this.elapsed.emit();
      }
    }
  }
}

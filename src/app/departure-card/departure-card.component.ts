import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { MonitoredStation } from '../shared/models/monitored-station.model';
import { DepartureMonitorService } from '../shared/services/departure-monitor.service';

@Component({
  selector: 'app-departure-card',
  templateUrl: './departure-card.component.html',
  styleUrls: ['./departure-card.component.scss'],
})
export class DepartureCardComponent implements OnInit {
  @Input() monitoredStation: MonitoredStation;
  @Output() monitoredStationRemovedEvent = new EventEmitter();
  inEditMode = false;
  lastUpdatedTimestamp: Date;

  updateInterval: NodeJS.Timeout;

  constructor(private departureMonitorService: DepartureMonitorService) { }

  async ngOnInit() {
    await this.updateDepartures();

    this.updateInterval = setInterval(() => {
      this.updateDepartures();
    }, 30000);
  }

  async updateDepartures(): Promise<void> {
    const departures = await this.departureMonitorService.getDepartures(this.monitoredStation);
    this.lastUpdatedTimestamp = new Date();

    if(!this.monitoredStation.departures) {
      	this.monitoredStation.departures = departures;
        return;
    }

    for(const departure of departures) {
      this.monitoredStation.departures.push(departure);
    }

    for(let i = 0; i < this.monitoredStation.departureCount; i++) {
      this.monitoredStation.departures.shift();
    }
  }

  enterEditMode(): void {
    clearInterval(this.updateInterval);
    this.inEditMode = true;
  }

  async onMonitoredStationEditorSubmitted(): Promise<void> {
    this.monitoredStation.departures = null;
    this.monitoredStation = await this.departureMonitorService.updateMonitoredStation(this.monitoredStation);
    this.inEditMode = false;
    await this.updateDepartures();

    this.updateInterval = setInterval(() => {
      this.updateDepartures();
    }, 30000);
  }

  onMonitoredStationRemoved(monitoredStation: MonitoredStation): void {
    this.monitoredStationRemovedEvent.emit(monitoredStation);
  }
}

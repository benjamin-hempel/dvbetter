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
  lastUpdatedSeconds = 0;

  updateInterval: NodeJS.Timeout;
  lastUpdatedInterval: NodeJS.Timeout;

  constructor(private departureMonitorService: DepartureMonitorService) { }

  async ngOnInit() {
    await this.updateDepartures();

    this.updateInterval = setInterval(() => {
      this.updateDepartures();
    }, 30000);

    this.lastUpdatedInterval = setInterval(() => {
      this.computeLastUpdatedSeconds();
    }, 500);
  }

  computeLastUpdatedSeconds(): void {
    this.lastUpdatedSeconds =
      Math.floor((new Date().getTime() - this.lastUpdatedTimestamp.getTime()) / 1000);
  }

  async updateDepartures(): Promise<void> {
    await this.departureMonitorService.updateDepartures(this.monitoredStation);
    this.lastUpdatedTimestamp = new Date();
    this.computeLastUpdatedSeconds();
  }

  enterEditMode(): void {
    clearInterval(this.updateInterval);
    clearInterval(this.lastUpdatedInterval);
    this.inEditMode = true;
  }

  async onMonitoredStationEditorSubmitted(): Promise<void> {
    this.lastUpdatedSeconds = 0;
    this.monitoredStation.departures = null;
    this.monitoredStation = await this.departureMonitorService.updateMonitoredStation(this.monitoredStation);
    this.inEditMode = false;
    await this.updateDepartures();

    this.updateInterval = setInterval(() => {
      this.updateDepartures();
    }, 30000);

    this.lastUpdatedInterval = setInterval(() => {
      this.computeLastUpdatedSeconds();
    }, 500);
  }

  onMonitoredStationRemoved(monitoredStation: MonitoredStation): void {
    this.monitoredStationRemovedEvent.emit(monitoredStation);
  }
}

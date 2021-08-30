import { Component, Input, OnInit } from '@angular/core';

import { MonitoredStation } from '../shared/models/monitored-station.model';
import { DepartureMonitorService } from '../shared/services/departure-monitor.service';

@Component({
  selector: 'app-departure-card',
  templateUrl: './departure-card.component.html',
  styleUrls: ['./departure-card.component.scss'],
})
export class DepartureCardComponent implements OnInit {
  @Input() monitoredStation: MonitoredStation;
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

  get skeletons(): Array<number> {
    return Array(this.monitoredStation.departureCount);
  }

  computeLastUpdatedSeconds(): void {
    this.lastUpdatedSeconds =
      Math.floor((new Date().getTime() - this.lastUpdatedTimestamp.getTime()) / 1000);
  }

  async updateDepartures() {
    await this.departureMonitorService.updateDepartures(this.monitoredStation);
    this.lastUpdatedTimestamp = new Date();
    this.computeLastUpdatedSeconds();
  }

  enterEditMode() {
    clearInterval(this.updateInterval);
    clearInterval(this.lastUpdatedInterval);
    this.inEditMode = true;
  }

  async onMonitoredStationEditorSubmitted() {
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
}

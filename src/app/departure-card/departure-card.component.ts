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
  isUpdating = true;
  lastUpdatedTimestamp: Date;

  updateInterval: NodeJS.Timeout;

  constructor(private departureMonitorService: DepartureMonitorService) { }

  async ngOnInit() {
    this.lastUpdatedTimestamp = new Date();
    await this.updateDepartures();

    this.updateInterval = setInterval(() => {
      this.updateDepartures();
    }, 30000);
  }

  get lastUpdatedSeconds(): number {
    return this.lastUpdatedTimestamp ? Math.floor((new Date().getTime() - this.lastUpdatedTimestamp.getTime()) / 1000) : 0;
  }

  async updateDepartures(): Promise<void> {
    this.isUpdating = true;

    const departures = await this.departureMonitorService.getDepartures(this.monitoredStation);
    if(departures.length === 0 && this.monitoredStation.departures.length > 0) {
      this.isUpdating = false;
      return;
    }

    this.monitoredStation.departures = departures;
    this.isUpdating = false;
    this.lastUpdatedTimestamp = new Date();
  }

  async tapToRefresh(): Promise<void> {
    clearInterval(this.updateInterval);

    await this.updateDepartures();

    this.updateInterval = setInterval(() => {
      this.updateDepartures();
    }, 30000);
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

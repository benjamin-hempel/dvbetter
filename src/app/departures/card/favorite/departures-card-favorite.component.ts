/* eslint-disable no-underscore-dangle */
import { Component, Input, OnInit } from '@angular/core';
import { StationService } from 'src/app/shared/services/station.service';
import { DepartureMonitorService } from '../../../shared/services/departure-monitor.service';
import { MonitoredStation } from '../../../shared/models/monitored-station.model';

@Component({
  selector: 'app-departures-card-favorite',
  templateUrl: './departures-card-favorite.component.html',
  styleUrls: ['./departures-card-favorite.component.scss'],
})
export class DeparturesCardFavoriteComponent implements OnInit {
  @Input() monitoredStation: MonitoredStation;

  inEditMode = false;
  isUpdating = true;
  lastUpdatedTimestamp: Date;
  updateInterval: NodeJS.Timeout;

  constructor(
    private stationService: StationService,
    private departureMonitorService: DepartureMonitorService)
  { }

  async ngOnInit() {
    this.stationService.getStationUpdated().subscribe(s => this.onStationUpdated(s));

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

  async onStationUpdated(station: MonitoredStation): Promise<void> {
    if(station._id === this.monitoredStation._id) {
      this.monitoredStation = station;
    }
  }

  async onMonitoredStationEditorSubmitted(): Promise<void> {
    this.monitoredStation.departures = null;
    await this.stationService.updateStation(this.monitoredStation);
    this.inEditMode = false;

    await this.updateDepartures();
    this.updateInterval = setInterval(() => {
      this.updateDepartures();
    }, 30000);
  }
}

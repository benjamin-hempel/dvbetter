/* eslint-disable no-underscore-dangle */
import { Component, Input, OnInit } from '@angular/core';
import { DateTimeService } from 'src/app/shared/services/date-time.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { StationService } from 'src/app/shared/services/station.service';
import { Station } from '../../../shared/models/station.model';
import { Departure } from 'src/app/shared/models/departure.model';

@Component({
  selector: 'app-departures-card-favorite',
  templateUrl: './departures-card-favorite.component.html',
  styleUrls: ['./departures-card-favorite.component.scss'],
})
export class DeparturesCardFavoriteComponent implements OnInit {
  @Input() station: Station;

  departures: Departure[] = [];
  inEditMode = false;
  isUpdating = true;
  lastUpdate: Date;

  updateInterval: NodeJS.Timeout;

  constructor(
    private dateTimeService: DateTimeService,
    private apiService: ApiService,
    private stationService: StationService)
  { }

  async ngOnInit() {
    this.stationService.getStationUpdated().subscribe(s => this.onStationUpdated(s));

    await this.updateDepartures();
    this.setUpdateInterval();
  }

  get secondsElapsed(): number {
    return this.lastUpdate ? this.dateTimeService.getSecondsElapsed(this.lastUpdate) : 0;
  }

  setUpdateInterval(): void {
    this.updateInterval = setInterval(() => {
      this.updateDepartures();
    }, 30000);
  }

  async updateDepartures(): Promise<void> {
    this.isUpdating = true;

    const departures = await this.apiService.getDepartures(this.station);
    if(departures.length === 0 && this.departures.length > 0) {
      this.isUpdating = false;
      return;
    }

    this.departures = departures;
    this.isUpdating = false;
    this.lastUpdate = new Date();
  }

  enterEditMode(): void {
    clearInterval(this.updateInterval);
    this.inEditMode = true;
  }

  async onStationUpdated(station: Station): Promise<void> {
    if(station._id === this.station._id) {
      this.station = station;
    }
  }

  async onEditorSubmitted(): Promise<void> {
    this.departures = [];
    this.lastUpdate = null;
    this.inEditMode = false;
    await this.updateDepartures();
    this.setUpdateInterval();
  }
}

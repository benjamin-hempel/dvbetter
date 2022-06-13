/* eslint-disable no-underscore-dangle */
import { Component, Input, OnInit } from '@angular/core';
import { HelperService } from 'src/app/shared/services/helper.service';
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

  constructor(
    private helperService: HelperService,
    private apiService: ApiService,
    private stationService: StationService)
  { }

  async ngOnInit() {
    this.stationService.getStationUpdated().subscribe(s => this.onStationUpdated(s));

    this.lastUpdate = new Date();
    await this.updateDepartures();
  }

  get secondsElapsed(): number {
    return this.lastUpdate ? this.helperService.getSecondsElapsed(this.lastUpdate) : 0;
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
    this.inEditMode = true;
  }

  async onStationUpdated(station: Station): Promise<void> {
    if(station._id === this.station._id) {
      this.station = station;
    }
  }

  async onMonitoredStationEditorSubmitted(): Promise<void> {
    this.departures = [];
    this.inEditMode = false;
    await this.updateDepartures();
  }
}

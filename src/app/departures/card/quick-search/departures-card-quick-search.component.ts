/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { format, add } from 'date-fns';
import { DateTimeService } from 'src/app/shared/services/date-time.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { StationService } from 'src/app/shared/services/station.service';
import { Station } from 'src/app/shared/models/station.model';
import { Departure } from 'src/app/shared/models/departure.model';

@Component({
  selector: 'app-departures-card-quick-search',
  templateUrl: './departures-card-quick-search.component.html',
  styleUrls: ['./departures-card-quick-search.component.scss'],
})
export class DeparturesCardQuickSearchComponent implements OnInit {
  selectedStation: Station;
  departures: Departure[] = [];

  inStationSelectedMode = false;
  isUpdating = true;
  isStationInFavorites = false;
  lastUpdate: Date;
  currentDate: string;
  maxDate: string;

  departureTime: FormControl;
  updateDateTimeInterval: NodeJS.Timeout;
  updateDeparturesInterval: NodeJS.Timeout;

  constructor(
    private dateTimeService: DateTimeService,
    private apiService: ApiService,
    private stationService: StationService)
  { }

  ngOnInit() {
    this.updateCurrentDate();
    this.updateDateTimeInterval = setInterval(() => {
      this.updateCurrentDate();
    }, 500);

    this.departureTime = new FormControl(this.currentDate, Validators.required);
  }

  get formattedDepartureTime(): string {
    return format(new Date(this.departureTime.value), 'dd.MM.yyyy, HH:mm');
  }

  get secondsElapsed(): number {
    return this.lastUpdate ? this.dateTimeService.getSecondsElapsed(this.lastUpdate) : 0;
  }

  updateCurrentDate(): void {
    const currentDateObj = new Date();
    this.currentDate = format(currentDateObj, 'yyyy-MM-dd\'T\'HH:mm');
    this.maxDate = format(add(currentDateObj, { months: 1 }), 'yyyy-MM-dd\'T\'HH:mm');

    if(this.departureTime && this.dateTimeService.getMinutesFromNow(new Date(this.departureTime.value)) < 0) {
      this.departureTime.setValue(this.currentDate);
    }
  }

  async updateDepartures(): Promise<void> {
    this.isUpdating = true;

    let minutesFromNow = this.dateTimeService.getMinutesFromNow(new Date(this.departureTime.value));
    if(minutesFromNow < 0) {
      minutesFromNow = 0;
    }

    const departures = await this.apiService.getDepartures(this.selectedStation, minutesFromNow);
    if(departures.length === 0 && this.departures.length > 0) {
      this.isUpdating = false;
      return;
    }

    this.departures = departures;
    this.isUpdating = false;
    this.lastUpdate = new Date();
  }

  async enterStationSelectedMode(): Promise<void> {
    const station = await this.stationService.getStation(this.selectedStation._id);
    if(station) {
      this.selectedStation = station;
      this.isStationInFavorites = true;
    }

    this.lastUpdate = null;
    this.inStationSelectedMode = true;

    this.updateDepartures();
    this.updateDeparturesInterval = setInterval(() => {
      this.updateDepartures();
    }, 30000);
  }

  leaveStationSelectedMode(): void {
    clearInterval(this.updateDeparturesInterval);
    this.inStationSelectedMode = false;
    this.isStationInFavorites = false;
    this.selectedStation = null;
    this.departures = [];
  }

  async addStationToFavorites(): Promise<void> {
    await this.stationService.createStation(this.selectedStation);
    this.leaveStationSelectedMode();
  }

  async removeStationFromFavorites(): Promise<void> {
    await this.stationService.deleteStation(this.selectedStation);
    this.leaveStationSelectedMode();
  }

  onStationSelected(station: Station): void {
    this.selectedStation = station;
  }
}

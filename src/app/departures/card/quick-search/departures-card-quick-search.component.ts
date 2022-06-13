/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { format, add, differenceInMinutes } from 'date-fns';
import { HelperService } from 'src/app/shared/services/helper.service';
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
  isStationNameValid = false;
  isStationInFavorites = false;
  lastUpdate: Date;
  currentDate: string;
  maxDate: string;

  departureTime: FormControl;
  updateCurrentDateInterval: NodeJS.Timeout;
  updateInterval: NodeJS.Timeout;

  constructor(
    private helperService: HelperService,
    private apiService: ApiService,
    private stationService: StationService)
  { }

  ngOnInit() {
    this.lastUpdate = new Date();
    this.updateCurrentDate();
    this.updateCurrentDateInterval = setInterval(() => {
      this.updateCurrentDate();
    }, 30000);
    this.departureTime = new FormControl(this.currentDate, Validators.required);
  }

  get formattedDepartureTime(): string {
    return format(new Date(this.departureTime.value), 'dd.MM.yyyy, HH:mm');
  }

  get secondsElapsed(): number {
    return this.lastUpdate ? this.helperService.getSecondsElapsed(this.lastUpdate) : 0;
  }

  updateCurrentDate(): void {
    const currentDateObj = new Date();
    this.currentDate = format(currentDateObj, 'yyyy-MM-dd\'T\'HH:mm');
    this.maxDate = format(add(currentDateObj, { months: 1 }), 'yyyy-MM-dd\'T\'HH:mm');

    if(this.departureTime && !(this.departureTime.dirty || this.departureTime.touched)) {
      this.departureTime.setValue(this.currentDate);
    }
  }

  async updateDepartures(): Promise<void> {
    this.isUpdating = true;

    let minutesFromNow = differenceInMinutes(new Date(this.departureTime.value), new Date());
    if(minutesFromNow < 0) {
      minutesFromNow = 0;
      this.updateCurrentDate();
      this.departureTime.setValue(this.currentDate);
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

  async searchDepartures(): Promise<void> {
    const station = await this.stationService.getStation(this.selectedStation._id);
    if(station) {
      this.selectedStation = station;
      this.isStationInFavorites = true;
    }

    this.inStationSelectedMode = true;
    this.updateDepartures();
  }

  async addStationToFavorites(): Promise<void> {
    await this.stationService.createStation(this.selectedStation);
    this.leaveStationSelectedMode();
  }

  async removeStationFromFavorites(): Promise<void> {
    await this.stationService.deleteStation(this.selectedStation);
    this.leaveStationSelectedMode();
  }

  leaveStationSelectedMode(): void {
    this.inStationSelectedMode = false;
    this.isStationInFavorites = false;
    this.selectedStation = null;
    this.departures = [];
  }

  onStationNameValidityChanged(isStationNameValid: boolean): void {
    this.isStationNameValid = isStationNameValid;
  }

  onSelectedStationChanged(station: Station): void {
    this.selectedStation = station;
  }
}

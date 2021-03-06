import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { format, add, differenceInMinutes } from 'date-fns';
import * as dvb from 'dvbjs';

import { MonitoredStation } from '../shared/models/monitored-station.model';
import { DepartureMonitorService } from '../shared/services/departure-monitor.service';

@Component({
  selector: 'app-quick-departure-search-card',
  templateUrl: './quick-departure-search-card.component.html',
  styleUrls: ['./quick-departure-search-card.component.scss'],
})
export class QuickDepartureSearchCardComponent implements OnInit {
  @Output() monitoredStationAddedEvent = new EventEmitter();
  @Output() monitoredStationRemovedEvent = new EventEmitter();

  inStationSelectedMode = false;
  isUpdating = true;
  isStationNameValid = false;
  isStationInFavorites = false;
  selectedStation: MonitoredStation;
  departureTime: FormControl;
  lastUpdatedTimestamp: Date;
  currentDate: string;
  maxDate: string;

  updateCurrentDateInterval: NodeJS.Timeout;
  updateInterval: NodeJS.Timeout;

  constructor(private departureMonitorService: DepartureMonitorService) { }

  ngOnInit() {
    this.lastUpdatedTimestamp = new Date();
    this.updateCurrentDate();
    this.updateCurrentDateInterval = setInterval(() => {
      this.updateCurrentDate();
    }, 30000);
    this.departureTime = new FormControl(this.currentDate, Validators.required);
  }

  get formattedDepartureTime(): string {
    return format(new Date(this.departureTime.value), 'dd.MM.yyyy, HH:mm');
  }

  get lastUpdatedSeconds(): number {
    return this.lastUpdatedTimestamp ? Math.floor((new Date().getTime() - this.lastUpdatedTimestamp.getTime()) / 1000) : 0;
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

    const departures = await this.departureMonitorService.getDepartures(this.selectedStation, minutesFromNow);
    if(departures.length === 0 && this.selectedStation.departures.length > 0) {
      this.isUpdating = false;
      return;
    }

    this.selectedStation.departures = departures;
    this.isUpdating = false;
    this.lastUpdatedTimestamp = new Date();
  }

  async searchDepartures(): Promise<void> {
    if(await this.departureMonitorService.getMonitoredStation(this.selectedStation.station.id)) {
      this.isStationInFavorites = true;
    }

    this.inStationSelectedMode = true;
    this.updateDepartures();
    this.updateInterval = setInterval(() => {
      this.updateDepartures();
    }, 30000);
  }

  async tapToRefresh(): Promise<void> {
    clearInterval(this.updateInterval);

    await this.updateDepartures();

    this.updateInterval = setInterval(() => {
      this.updateDepartures();
    }, 30000);
  }

  async addStationToFavorites(): Promise<void> {
    // Do not save departures to database
    const stationToSave = new MonitoredStation();
    stationToSave.station = this.selectedStation.station;
    stationToSave.departureCount = this.selectedStation.departureCount;

    await this.departureMonitorService.addMonitoredStation(stationToSave);
    this.monitoredStationAddedEvent.emit(this.selectedStation.station.id);
    this.leaveStationSelectedMode();
  }

  async removeStationFromFavorites(): Promise<void> {
    this.monitoredStationRemovedEvent.emit(this.selectedStation);
    this.isStationInFavorites = false;
  }

  leaveStationSelectedMode(): void {
    this.inStationSelectedMode = false;
    this.isStationInFavorites = false;
    this.selectedStation = null;
    clearInterval(this.updateInterval);
  }

  onStationNameValidityChanged(isStationNameValid: boolean): void {
    this.isStationNameValid = isStationNameValid;
  }

  onSelectedStationChanged(station: dvb.ILocation): void {
    this.selectedStation = new MonitoredStation();
    this.selectedStation.station = station;
    this.selectedStation.departureCount = 5;
  }
}

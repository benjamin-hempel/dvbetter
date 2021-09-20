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
  isStationNameValid = false;
  isStationInFavorites = false;
  selectedStation: MonitoredStation;
  departureTime: FormControl;
  currentDate: string;
  maxDate: string;

  constructor(private departureMonitorService: DepartureMonitorService) { }

  ngOnInit() {
    this.updateCurrentDate();
    this.departureTime = new FormControl(this.currentDate, Validators.required);
  }

  updateCurrentDate(): void {
    const currentDateObj = new Date();
    this.currentDate = format(currentDateObj, 'yyyy-MM-dd\'T\'HH:mm');
    this.maxDate = format(add(currentDateObj, { months: 1 }), 'yyyy-MM-dd\'T\'HH:mm');
  }

  get formattedDepartureTime(): string {
    return format(new Date(this.departureTime.value), 'dd.MM.yyyy, HH:mm');
  }

  async searchDepartures(): Promise<void> {
    if(await this.departureMonitorService.getMonitoredStation(this.selectedStation.station.id)) {
      this.isStationInFavorites = true;
    }

    this.inStationSelectedMode = true;
    let minutesFromNow = differenceInMinutes(new Date(this.departureTime.value), new Date());
    if(minutesFromNow < 0) {
      minutesFromNow = 0;
      this.updateCurrentDate();
      this.departureTime.setValue(this.currentDate);
    }

    this.departureMonitorService.updateDepartures(this.selectedStation, minutesFromNow);
  }

  leaveStationSelectedMode(): void {
    this.inStationSelectedMode = false;
    this.isStationInFavorites = false;
    this.selectedStation = null;
  }

  onStationNameValidityChanged(isStationNameValid: boolean): void {
    this.isStationNameValid = isStationNameValid;
  }

  onSelectedStationChanged(station: dvb.ILocation): void {
    this.selectedStation = new MonitoredStation();
    this.selectedStation.station = station;
    this.selectedStation.departureCount = 5;
  }

  async addStationToFavorites(): Promise<void> {
    // Do not save departures to database
    const stationToSave = new MonitoredStation();
    stationToSave.station = this.selectedStation.station;
    stationToSave.departureCount = this.selectedStation.departureCount;

    await this.departureMonitorService.addMonitoredStation(stationToSave);
    this.monitoredStationAddedEvent.emit(this.selectedStation.station.id);
    this.isStationInFavorites = true;
  }

  async removeStationFromFavorites(): Promise<void> {
    this.monitoredStationRemovedEvent.emit(this.selectedStation.station.id);
    this.departureMonitorService.deleteMonitoredStation(this.selectedStation);
    this.isStationInFavorites = false;
  }
}

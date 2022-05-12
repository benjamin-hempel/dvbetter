import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import * as dvb from 'dvbjs';

import { MonitoredStation } from '../../models/monitored-station.model';

@Component({
  selector: 'app-station-picker',
  templateUrl: './station-picker.component.html',
  styleUrls: ['./station-picker.component.scss'],
})
export class StationPickerComponent implements OnInit {
  @Input() selectedStation: MonitoredStation;
  @Output() stationNameValidityChangedEvent = new EventEmitter();
  @Output() selectedStationChangedEvent = new EventEmitter();
  matchingStations: dvb.ILocation[];
  stationName: FormControl;

  constructor() { }

  ngOnInit() {
    this.stationName = new FormControl(this.combinedStationName, [
      Validators.required
    ]);
  }

  get combinedStationName(): string {
    return this.selectedStation ? this.selectedStation.station.name + ', ' + this.selectedStation.station.city : '';
  }

  get stationNameValid(): boolean {
    return this.stationName.valid && this.stationName.value === this.combinedStationName;
  }

  async getMatchingStations(event: any): Promise<void> {
    const stationName: string = event.target.value;
    this.stationName.setValue(stationName);
    this.stationName.markAsDirty();
    this.stationNameValidityChangedEvent.emit(this.stationNameValid);

    if(stationName == null || stationName === '') {
      this.matchingStations = [];
      return;
    }

    this.matchingStations = (await dvb.findStop(stationName)).slice(0, 4);
  }

  selectStation(station: dvb.ILocation): void {
    this.selectedStation = new MonitoredStation();
    this.selectedStation.station = station;
    this.stationName.setValue(this.combinedStationName);
    this.matchingStations = [];
    this.stationNameValidityChangedEvent.emit(this.stationNameValid);
    this.selectedStationChangedEvent.emit(station);
  }
}

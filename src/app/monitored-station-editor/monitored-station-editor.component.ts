import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as dvb from 'dvbjs';

import { MonitoredStation } from '../shared/models/monitored-station.model';

@Component({
  selector: 'app-monitored-station-editor',
  templateUrl: './monitored-station-editor.component.html',
  styleUrls: ['./monitored-station-editor.component.scss'],
})
export class MonitoredStationEditorComponent implements OnInit {
  @Input() monitoredStation: MonitoredStation;
  @Output() submittedEvent = new EventEmitter();
  selectedStation: dvb.ILocation;
  matchingStations: dvb.ILocation[];
  stationName: FormControl;
  departureCount: FormControl;

  constructor() { }

  ngOnInit() {
    this.selectedStation = this.monitoredStation.station;
    this.stationName = new FormControl(this.combinedStationName);
    this.departureCount = new FormControl(this.monitoredStation.departureCount);
  }

  get combinedStationName() {
    return this.selectedStation.name + ', ' + this.selectedStation.city;
  }

  async getMatchingStations(event: any): Promise<void> {
    const stationName: string = event.target.value;
    this.matchingStations = (await dvb.findStop(stationName)).slice(0, 4);
  }

  selectStation(station: dvb.ILocation) {
    this.selectedStation = station;
    this.stationName.setValue(this.combinedStationName);
    this.matchingStations = [];
  }

  submit() {
    this.monitoredStation.station = this.selectedStation;
    this.monitoredStation.departureCount = this.departureCount.value;
    this.submittedEvent.emit();
  }
}

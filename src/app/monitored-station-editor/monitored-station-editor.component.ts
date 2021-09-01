import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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
  departureCount: FormControl;
  selectedStation: dvb.ILocation;
  isStationNameValid = true;

  constructor() { }

  ngOnInit() {
    this.selectedStation = this.monitoredStation.station;
    this.departureCount = new FormControl(this.monitoredStation.departureCount, [
      Validators.required,
      Validators.min(1),
      Validators.max(10)
    ]);
  }

  get isFormValid(): boolean {
    return this.isStationNameValid && this.departureCount.valid;
  }

  onSelectedStationChanged(station: dvb.ILocation): void {
    this.selectedStation = station;
  }

  onStationNameValidityChanged(isStationNameValid: boolean): void {
    this.isStationNameValid = isStationNameValid;
  }

  submit(): void {
    this.monitoredStation.station = this.selectedStation;
    this.monitoredStation.departureCount = this.departureCount.value;
    this.submittedEvent.emit();
  }
}

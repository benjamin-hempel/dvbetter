import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { MonitoredStation } from '../../shared/models/monitored-station.model';

@Component({
  selector: 'app-departures-station-editor',
  templateUrl: './departures-station-editor.component.html',
  styleUrls: ['./departures-station-editor.component.scss'],
})
export class DeparturesStationEditorComponent implements OnInit {
  @Input() monitoredStation: MonitoredStation;
  @Output() submittedEvent = new EventEmitter();
  @Output() monitoredStationRemovedEvent = new EventEmitter();
  departureCount: FormControl;
  isStationNameValid = true;

  constructor() { }

  ngOnInit() {
    this.departureCount = new FormControl(this.monitoredStation.departureCount, [
      Validators.required,
      Validators.min(1),
      Validators.max(10)
    ]);
  }

  get isFormValid(): boolean {
    return this.departureCount.valid;
  }

  submit(): void {
    this.monitoredStation.departureCount = this.departureCount.value;
    this.submittedEvent.emit();
  }

  removeStationFromFavorites(): void {
    this.monitoredStationRemovedEvent.emit(this.monitoredStation);
  }
}

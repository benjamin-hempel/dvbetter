import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { StationService } from 'src/app/shared/services/station.service';
import { Station } from '../../shared/models/station.model';

@Component({
  selector: 'app-departures-station-editor',
  templateUrl: './departures-station-editor.component.html',
  styleUrls: ['./departures-station-editor.component.scss'],
})
export class DeparturesStationEditorComponent implements OnInit {
  @Input() station: Station;
  @Output() submittedEvent = new EventEmitter();

  departureCount: FormControl;
  isStationNameValid = true;

  constructor(private stationService: StationService) { }

  ngOnInit() {
    this.departureCount = new FormControl(this.station.departureCount, [
      Validators.required,
      Validators.min(1),
      Validators.max(10)
    ]);
  }

  get isFormValid(): boolean {
    return this.departureCount.valid;
  }

  async submit(): Promise<void> {
    this.station.departureCount = this.departureCount.value;
    await this.stationService.updateStation(this.station);
    this.submittedEvent.emit();
  }

  async removeStationFromFavorites(): Promise<void> {
    await this.stationService.deleteStation(this.station);
  }
}

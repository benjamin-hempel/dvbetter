import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Station } from '../../models/station.model';

@Component({
  selector: 'app-station-picker',
  templateUrl: './station-picker.component.html',
  styleUrls: ['./station-picker.component.scss'],
})
export class StationPickerComponent implements OnInit {
  @Output() stationSelected = new EventEmitter();

  isUpdating = false;
  selectedStation: Station;
  matchingStations: Station[];

  stationName: FormControl;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.stationName = new FormControl(this.combinedStationName(), [
      Validators.required
    ]);
  }

  combinedStationName(): string {
    return this.selectedStation ? this.selectedStation.name + ', ' + this.selectedStation.city : '';
  }

  async onInput(event: any): Promise<void> {
    const stationName: string = event.target.value;

    if(this.selectedStation && stationName !== this.combinedStationName()) {
      this.selectedStation = null;
      this.stationSelected.emit(null);
    }

    if(!stationName) {
      this.matchingStations = [];
      return;
    }

    if(stationName.length >= 3) {
      setTimeout(() => this.onDebounceElapsed(stationName), 300);
    }
  }

  async onDebounceElapsed(stationName: string): Promise<void> {
    if(stationName === this.stationName.value) {
      this.isUpdating = true;
      this.matchingStations = (await this.apiService.getStations(stationName)).slice(0, 3);
      this.isUpdating = false;
    }
  }

  onSelect(station: Station): void {
    this.selectedStation = station;
    this.stationName.setValue(this.combinedStationName());
    this.matchingStations = [];
    this.stationSelected.emit(station);
  }
}

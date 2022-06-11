import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MonitoredStation } from '../models/monitored-station.model';
import { DepartureMonitorService } from './departure-monitor.service';

@Injectable({
  providedIn: 'root'
})
export class StationService {
  private stationCreated = new Subject<MonitoredStation>();
  private stationUpdated = new Subject<MonitoredStation>();
  private stationDeleted = new Subject<MonitoredStation>();
  private stations: MonitoredStation[];

  constructor(private departureMonitorService: DepartureMonitorService) { }

  getStationCreated(): Observable<MonitoredStation> {
    return this.stationCreated.asObservable();
  }

  getStationUpdated(): Observable<MonitoredStation> {
    return this.stationUpdated.asObservable();
  }

  getStationDeleted(): Observable<MonitoredStation> {
    return this.stationDeleted.asObservable();
  }

  async getStations(): Promise<MonitoredStation[]> {
    if(!this.stations) {
      this.stations = await this.departureMonitorService.getMonitoredStations();
    }

    return this.stations;
  }

  async createStation(station: MonitoredStation): Promise<void> {
    const createdStation = await this.departureMonitorService.addMonitoredStation(station);
    this.stationCreated.next(createdStation);
  }

  async updateStation(station: MonitoredStation): Promise<void> {
    const updatedStation = await this.departureMonitorService.updateMonitoredStation(station);
    this.stationUpdated.next(updatedStation);
  }

  async deleteStation(station: MonitoredStation): Promise<void> {
    await this.departureMonitorService.deleteMonitoredStation(station);
    this.stationDeleted.next(station);
  }
}

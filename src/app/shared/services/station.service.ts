import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MonitoredStation } from '../models/monitored-station.model';
import { DepartureMonitorService } from './departure-monitor.service';

@Injectable({
  providedIn: 'root'
})
export class StationService {
  stationCreated = new Subject<MonitoredStation>();
  stationUpdated = new Subject<MonitoredStation>();
  stationDeleted = new Subject<MonitoredStation>();

  constructor(private departureMonitorService: DepartureMonitorService) { }

  async initialize(): Promise<void> {
    const stations = await this.departureMonitorService.getMonitoredStations();
    for(const station of stations) {
      this.stationCreated.next(station);
    }
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

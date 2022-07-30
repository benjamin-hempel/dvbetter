/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Station } from '../models/station.model';
import { StationStorageService } from './station-storage.service';

@Injectable({
  providedIn: 'root'
})
export class StationService {
  private stationCreated = new Subject<Station>();
  private stationUpdated = new Subject<Station>();
  private stationDeleted = new Subject<Station>();
  private stations: Station[];

  constructor(private stationStorageService: StationStorageService) { }

  getStationCreated(): Observable<Station> {
    return this.stationCreated.asObservable();
  }

  getStationUpdated(): Observable<Station> {
    return this.stationUpdated.asObservable();
  }

  getStationDeleted(): Observable<Station> {
    return this.stationDeleted.asObservable();
  }

  async getStations(): Promise<Station[]> {
    if(!this.stations) {
      this.stations = await this.stationStorageService.getStations();
    }

    return this.stations;
  }

  async getStation(id: string): Promise<Station> {
    return await this.stationStorageService.getStation(id);
  }

  async createStation(station: Station): Promise<void> {
    const createdStation = await this.stationStorageService.addUpdateStation(station);
    this.stationCreated.next(createdStation);
  }

  async updateStation(station: Station): Promise<void> {
    const updatedStation = await this.stationStorageService.addUpdateStation(station);
    this.stationUpdated.next(updatedStation);
  }

  async deleteStation(station: Station): Promise<void> {
    const deletedStation = await this.stationStorageService.deleteStation(station);
    this.stationDeleted.next(deletedStation);
  }
}

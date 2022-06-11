/* eslint-disable no-underscore-dangle */
import * as dvb from 'dvbjs';
import { Injectable } from '@angular/core';
import { Station } from '../models/station.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  async getStations(name: string): Promise<Station[]> {
    try {
      const stops = await dvb.findStop(name);
      return stops.map(s => {
        const station = new Station();
        station._id = s.id;
        station.name = s.name;
        station.city = s.city;
        return station;
      });
    }
    catch {
      return [];
    }
  }

  async getDepartures(station: Station, minutesFromNow: number = 0): Promise<dvb.IMonitor[]> {
    try {
      return await dvb.monitor(station._id, minutesFromNow, station.departureCount);
    }
    catch {
      return [];
    }
  }
}

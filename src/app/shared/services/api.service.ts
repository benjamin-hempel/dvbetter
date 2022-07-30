/* eslint-disable no-underscore-dangle */
import * as dvb from 'dvbjs';
import { Injectable } from '@angular/core';
import { Station } from '../models/station.model';
import { Departure } from '../models/departure.model';

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

  async getDepartures(station: Station, minutesFromNow: number = 0): Promise<Departure[]> {
    try {
      const monitors = await dvb.monitor(station._id, minutesFromNow, station.departureCount);
      return monitors.map(m => {
        const departure = new Departure();
        departure.line = m.line;
        departure.destination = m.direction;
        departure.arrival = m.arrivalTime;
        departure.relativeArrival = m.arrivalTimeRelative;
        departure.relativeDelay = m.delayTime;
        departure.hasLiveData = m.state === 'Unknown' ? false : true;
        departure.isCancelled = m.state === 'Cancelled' ? true : false;
        departure.platformType = m.platform.type;
        departure.platformName = m.platform.name;
        departure.modeIconUrl = m.mode.iconUrl;
        return departure;
      });
    }
    catch {
      return [];
    }
  }
}

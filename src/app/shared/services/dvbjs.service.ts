/* eslint-disable no-underscore-dangle */
import * as dvb from 'dvbjs';
import { Injectable } from '@angular/core';
import { Station } from '../models/station.model';

@Injectable({
  providedIn: 'root'
})
export class DvbjsService {

  constructor() { }

  async getDepartures(station: Station, minutesFromNow: number = 0): Promise<dvb.IMonitor[]> {
    try {
      return await dvb.monitor(station._id, minutesFromNow, station.departureCount);
    }
    catch {
      return [];
    }
  }
}

/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import PouchDB from 'pouchdb';
import { Injectable } from '@angular/core';
import { Station } from '../models/station.model';

@Injectable({
  providedIn: 'root'
})
export class StationStorageService {
  db: PouchDB.Database<Station>;

  constructor() {
    this.db = new PouchDB('stations');
  }

  async getStations(): Promise<Station[]> {
    const response = await this.db.allDocs({include_docs: true});
    return response.rows.map(row => row.doc);
  }

  async getStation(id: string): Promise<Station> {
    try {
      return await this.db.get(id);
    }
    catch {
      return null;
    }
  }

  async addUpdateStation(station: Station): Promise<Station> {
    await this.db.put(station);
    return await this.db.get(station._id); // Get updated rev
  }

  async deleteStation(station: Station): Promise<Station> {
    await this.db.remove(station);
    station._rev = ''; // Strip rev
    return station;
  }
}

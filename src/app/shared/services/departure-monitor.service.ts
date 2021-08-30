/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import * as PouchDB from 'pouchdb/dist/pouchdb';
import * as dvb from 'dvbjs';

import { MonitoredStation } from '../models/monitored-station.model';

@Injectable({
    providedIn: 'root'
})
export class DepartureMonitorService {
    db: PouchDB.Database<MonitoredStation>;

    constructor() {
        this.db = new PouchDB('monitoredStations');
    }

    async getMonitoredStations(): Promise<MonitoredStation[]> {
        const response = await this.db.allDocs({include_docs: true});
        const monitoredStations: MonitoredStation[] = [];
        for(const row of response.rows) {
            monitoredStations.push(row.doc);
        }
        return monitoredStations;
    }

    async addMonitoredStation(monitoredStation: MonitoredStation): Promise<MonitoredStation> {
        await this.db.put(monitoredStation);
        return await this.db.get(monitoredStation._id);
    }

    async updateMonitoredStation(monitoredStation: MonitoredStation): Promise<MonitoredStation> {
        await this.db.put(monitoredStation);
        return await this.db.get(monitoredStation._id);
    }

    async deleteMonitoredStation(monitoredStation: MonitoredStation): Promise<void> {
        await this.db.remove(monitoredStation);
    }

    async updateDepartures(monitoredStation: MonitoredStation): Promise<void> {
        monitoredStation.departures = await dvb.monitor(monitoredStation.station.id, 0, monitoredStation.departureCount);
    }
}

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
            row.doc.departures = [];
            monitoredStations.push(row.doc);
        }
        return monitoredStations;
    }

    async getMonitoredStation(stationId: string): Promise<MonitoredStation> {
        try {
            const monitoredStation = await this.db.get(stationId);
            monitoredStation.departures = [];
            return monitoredStation;
        }
        catch {
            return null;
        }
    }

    async addMonitoredStation(monitoredStation: MonitoredStation): Promise<MonitoredStation> {
        monitoredStation._id = monitoredStation.station.id;
        await this.db.put(monitoredStation);
        return await this.db.get(monitoredStation._id);
    }

    async updateMonitoredStation(monitoredStation: MonitoredStation): Promise<MonitoredStation> {
        await this.db.put(monitoredStation);
        return await this.db.get(monitoredStation._id);
    }

    async deleteMonitoredStation(monitoredStation: MonitoredStation): Promise<void> {
        if(!monitoredStation._id || !monitoredStation._rev) {
            monitoredStation = await this.getMonitoredStation(monitoredStation.station.id);
        }

        await this.db.remove(monitoredStation);
    }

    async getDepartures(monitoredStation: MonitoredStation, minutesFromNow: number = 0): Promise<dvb.IMonitor[]> {
        try {
            return await dvb.monitor(monitoredStation.station.id, minutesFromNow, monitoredStation.departureCount);
        }
        catch {
            return [];
        }
    }
}

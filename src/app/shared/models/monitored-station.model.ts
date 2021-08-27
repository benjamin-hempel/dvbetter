import * as dvb from 'dvbjs';

export class MonitoredStation {
    station: dvb.ILocation;
    departures: dvb.IMonitor[];
    departureCount = 4;

    async updateDepartures(): Promise<void> {
        this.departures = await dvb.monitor(this.station.id, 0, this.departureCount);
    }
}

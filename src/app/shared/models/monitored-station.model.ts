import * as dvb from 'dvbjs';

export class MonitoredStation {
    _id: string;
    _rev: string;
    station: dvb.ILocation;
    departures: dvb.IMonitor[];
    departureCount = 4;
}

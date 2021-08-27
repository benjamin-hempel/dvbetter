import { Component } from '@angular/core';
import * as dvb from 'dvbjs';

import { MonitoredStation } from '../shared/models/monitored-station.model';

@Component({
  selector: 'app-departures',
  templateUrl: 'departures.page.html',
  styleUrls: ['departures.page.scss']
})
export class DeparturesPage {
  monitoredStations: MonitoredStation[] = [];

  constructor() {
    const station = new MonitoredStation();
    dvb.findStop('S-Bf. N').then(stops => {
      station.station = stops[0];
      this.monitoredStations.push(station);
      station.updateDepartures();
    });
  }
}

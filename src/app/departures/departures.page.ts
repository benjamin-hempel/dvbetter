import { Component } from '@angular/core';
import * as dvb from 'dvbjs';

@Component({
  selector: 'app-departures',
  templateUrl: 'departures.page.html',
  styleUrls: ['departures.page.scss']
})
export class DeparturesPage {
  departures: dvb.IMonitor[];
  departuresPerStop = 4;

  constructor() {
    dvb.monitor('33000210', 0, this.departuresPerStop).then(departures => {
      this.departures = departures.filter(departure => departure.arrivalTimeRelative >= 0);
    });
  }
}

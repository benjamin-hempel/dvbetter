import { Component, OnInit } from '@angular/core';

import { MonitoredStation } from '../shared/models/monitored-station.model';
import { DepartureMonitorService } from '../shared/services/departure-monitor.service';

@Component({
  selector: 'app-departures',
  templateUrl: 'departures.page.html',
  styleUrls: ['departures.page.scss']
})
export class DeparturesPage implements OnInit {
  monitoredStations: MonitoredStation[] = [];

  constructor(private departureMonitorService: DepartureMonitorService) { }

  async ngOnInit() {
    this.monitoredStations = await this.departureMonitorService.getMonitoredStations();
  }
}

/* eslint-disable no-underscore-dangle */
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

  async onMonitoredStationAdded(stationId: string) {
    const stationToAdd = await this.departureMonitorService.getMonitoredStation(stationId);
    this.monitoredStations.push(stationToAdd);
  }

  onMonitoredStationRemoved(stationId: string) {
    const index = this.monitoredStations.findIndex(monitoredStation => monitoredStation._id === stationId);
    this.monitoredStations.splice(index, 1);
  }
}

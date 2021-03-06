/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

import { MonitoredStation } from '../shared/models/monitored-station.model';
import { DepartureMonitorService } from '../shared/services/departure-monitor.service';

@Component({
  selector: 'app-departures',
  templateUrl: 'departures.page.html',
  styleUrls: ['departures.page.scss']
})
export class DeparturesPage implements OnInit {
  monitoredStations: MonitoredStation[] = [];

  constructor(
    private departureMonitorService: DepartureMonitorService,
    private toastController: ToastController,
    private translateService: TranslateService)
  { }

  async ngOnInit() {
    this.monitoredStations = await this.departureMonitorService.getMonitoredStations();
  }

  getCombinedStationName(monitoredStation: MonitoredStation): string {
    return monitoredStation.station.name + ', ' + monitoredStation.station.city;
  }

  async onMonitoredStationAdded(stationId: string) {
    const stationToAdd = await this.departureMonitorService.getMonitoredStation(stationId);
    this.monitoredStations.push(stationToAdd);

    const toast = await this.toastController.create({
      message: this.translateService.instant('shared.favorite.added', {name: this.getCombinedStationName(stationToAdd)}),
      duration: 3000
    });
    toast.present();
  }

  async onMonitoredStationRemoved(monitoredStation: MonitoredStation) {
    this.departureMonitorService.deleteMonitoredStation(monitoredStation);

    const index = this.monitoredStations.findIndex(stationToDelete => stationToDelete._id === monitoredStation._id);
    const removedStations = this.monitoredStations.splice(index, 1);

    const toast = await this.toastController.create({
      message: this.translateService.instant('shared.favorite.removed', {name: this.getCombinedStationName(removedStations[0])}),
      duration: 3000
    });
    toast.present();
  }
}

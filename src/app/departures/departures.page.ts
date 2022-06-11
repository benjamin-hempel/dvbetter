/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { MonitoredStation } from '../shared/models/monitored-station.model';
import { StationService } from '../shared/services/station.service';

@Component({
  selector: 'app-departures',
  templateUrl: 'departures.page.html',
  styleUrls: ['departures.page.scss']
})
export class DeparturesPage implements OnInit {
  monitoredStations: MonitoredStation[] = [];

  constructor(
    private stationService: StationService,
    private toastController: ToastController,
    private translateService: TranslateService)
  { }

  async ngOnInit() {
    this.stationService.getStationCreated().subscribe(s => this.onStationCreated(s));
    this.stationService.getStationDeleted().subscribe(s => this.onStationDeleted(s));

    this.monitoredStations = await this.stationService.getStations();
  }

  getCombinedStationName(monitoredStation: MonitoredStation): string {
    return monitoredStation.station.name + ', ' + monitoredStation.station.city;
  }

  async onStationCreated(station: MonitoredStation): Promise<void> {
    this.monitoredStations.push(station);

    const toast = await this.toastController.create({
      message: this.translateService.instant('shared.favorite.added', {name: this.getCombinedStationName(station)}),
      duration: 3000
    });
    toast.present();
  }

  async onStationDeleted(station: MonitoredStation): Promise<void> {
    const index = this.monitoredStations.findIndex(s => s._id === station._id);
    this.monitoredStations.splice(index, 1);

    const toast = await this.toastController.create({
      message: this.translateService.instant('shared.favorite.removed', {name: this.getCombinedStationName(station)}),
      duration: 3000
    });
    toast.present();
  }
}

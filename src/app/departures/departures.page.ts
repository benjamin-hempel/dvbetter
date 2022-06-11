/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Station } from '../shared/models/station.model';
import { StationService } from '../shared/services/station.service';

@Component({
  selector: 'app-departures',
  templateUrl: 'departures.page.html',
  styleUrls: ['departures.page.scss']
})
export class DeparturesPage implements OnInit {
  stations: Station[] = [];

  constructor(
    private stationService: StationService,
    private toastController: ToastController,
    private translateService: TranslateService)
  { }

  async ngOnInit() {
    this.stationService.getStationCreated().subscribe(s => this.onStationCreated(s));
    this.stationService.getStationDeleted().subscribe(s => this.onStationDeleted(s));

    this.stations = await this.stationService.getStations();
    this.stations.sort((a, b) => this.compare(a, b));
  }

  getCombinedStationName(station: Station): string {
    return station.name + ', ' + station.city;
  }

  compare(a: Station, b: Station): number {
    if(a.city === b.city) {
      return a.name.localeCompare(b.name);
    }

    return a.city.localeCompare(b.city);
  }

  async onStationCreated(station: Station): Promise<void> {
    this.stations.push(station);
    this.stations.sort((a, b) => this.compare(a, b));

    const toast = await this.toastController.create({
      message: this.translateService.instant('shared.favorite.added', {name: this.getCombinedStationName(station)}),
      duration: 3000
    });
    toast.present();
  }

  async onStationDeleted(station: Station): Promise<void> {
    const index = this.stations.findIndex(s => s._id === station._id);
    this.stations.splice(index, 1);

    const toast = await this.toastController.create({
      message: this.translateService.instant('shared.favorite.removed', {name: this.getCombinedStationName(station)}),
      duration: 3000
    });
    toast.present();
  }
}

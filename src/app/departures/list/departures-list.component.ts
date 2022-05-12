import { Component, Input, OnInit } from '@angular/core';
import { MonitoredStation } from '../../shared/models/monitored-station.model';

@Component({
  selector: 'app-departures-list',
  templateUrl: './departures-list.component.html',
  styleUrls: ['./departures-list.component.scss'],
})
export class DeparturesListComponent implements OnInit {
  @Input() monitoredStation: MonitoredStation;

  constructor() { }

  ngOnInit() {}
}

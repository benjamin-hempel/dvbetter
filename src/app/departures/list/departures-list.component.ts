import * as dvb from 'dvbjs';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-departures-list',
  templateUrl: './departures-list.component.html',
  styleUrls: ['./departures-list.component.scss'],
})
export class DeparturesListComponent implements OnInit {
  @Input() departures: dvb.IMonitor[];

  constructor() { }

  ngOnInit() {}
}

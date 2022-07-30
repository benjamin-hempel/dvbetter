import { Component, Input, OnInit } from '@angular/core';
import { Departure } from 'src/app/shared/models/departure.model';

@Component({
  selector: 'app-departures-list',
  templateUrl: './departures-list.component.html',
  styleUrls: ['./departures-list.component.scss'],
})
export class DeparturesListComponent implements OnInit {
  @Input() departures: Departure[];

  constructor() { }

  ngOnInit() {}
}

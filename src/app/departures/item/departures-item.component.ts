import { Component, Input, OnInit } from '@angular/core';
import { StringService } from 'src/app/shared/services/string.service';
import { Departure } from 'src/app/shared/models/departure.model';

@Component({
  selector: 'app-departures-item',
  templateUrl: './departures-item.component.html',
  styleUrls: ['./departures-item.component.scss'],
})
export class DeparturesItemComponent implements OnInit {
  @Input() departure: Departure;

  constructor(private stringService: StringService) { }

  ngOnInit() {}

  get departureTime(): string {
    return this.stringService.getDepartureTime(this.departure);
  }

  get delay(): string {
    return this.stringService.getDelay(this.departure);
  }
}

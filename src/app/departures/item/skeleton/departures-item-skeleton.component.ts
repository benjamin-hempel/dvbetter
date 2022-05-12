import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-departures-item-skeleton',
  templateUrl: './departures-item-skeleton.component.html',
  styleUrls: ['./departures-item-skeleton.component.scss'],
})
export class DeparturesItemSkeletonComponent implements OnInit {
  @Input() departureCount: number;

  constructor() { }

  ngOnInit() {}

  get skeletons(): Array<number> {
    return Array(this.departureCount);
  }
}

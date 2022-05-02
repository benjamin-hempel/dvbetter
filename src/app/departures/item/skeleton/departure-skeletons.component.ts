import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-departure-skeletons',
  templateUrl: './departure-skeletons.component.html',
  styleUrls: ['./departure-skeletons.component.scss'],
})
export class DepartureSkeletonsComponent implements OnInit {
  @Input() departureCount: number;

  constructor() { }

  ngOnInit() {}

  get skeletons(): Array<number> {
    return Array(this.departureCount);
  }
}

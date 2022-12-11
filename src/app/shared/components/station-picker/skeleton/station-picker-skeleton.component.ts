import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-station-picker-skeleton',
  templateUrl: './station-picker-skeleton.component.html',
  styleUrls: ['./station-picker-skeleton.component.scss'],
})
export class StationPickerSkeletonComponent implements OnInit {
  constructor() { }

  ngOnInit() {}

  get skeletons(): Array<number> {
    return Array(3);
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { AppTitleComponent } from './app-title/app-title.component';
import { StationPickerComponent } from './station-picker/station-picker.component';
import { StationPickerSkeletonComponent } from './station-picker/skeleton/station-picker-skeleton/station-picker-skeleton.component';
import { TimerComponent } from './timer/timer.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppTitleComponent,
    StationPickerComponent,
    StationPickerSkeletonComponent,
    TimerComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AppTitleComponent,
    StationPickerComponent,
    StationPickerSkeletonComponent,
    TimerComponent
  ]
})
export class SharedComponentsModule { }

import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeparturesPage } from './departures.page';

import { AppTitleComponent } from '../app-title/app-title.component';
import { DeparturesPageRoutingModule } from './departures-routing.module';
import { DepartureCardComponent } from '../departure-card/departure-card.component';
import { DepartureItemComponent } from '../departure-item/departure-item.component';
import { MonitoredStationEditorComponent } from '../monitored-station-editor/monitored-station-editor.component';
import { StationPickerComponent } from '../station-picker/station-picker.component';
import { QuickDepartureSearchCardComponent } from '../quick-departure-search-card/quick-departure-search-card.component';
import { DepartureListComponent } from '../departure-list/departure-list.component';
import { TimerComponent } from '../timer/timer.component';
import { DepartureSkeletonsComponent } from '../departure-skeletons/departure-skeletons.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DeparturesPageRoutingModule,
    TranslateModule
  ],
  declarations: [
    AppTitleComponent,
    DeparturesPage,
    DepartureCardComponent,
    QuickDepartureSearchCardComponent,
    DepartureItemComponent,
    MonitoredStationEditorComponent,
    StationPickerComponent,
    DepartureListComponent,
    TimerComponent,
    DepartureSkeletonsComponent
  ]
})
export class DeparturesPageModule {}

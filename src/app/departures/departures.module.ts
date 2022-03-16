import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DeparturesPageRoutingModule } from './departures-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { SharedComponentsModule } from '../shared-components/shared-components.module';

import { DeparturesPage } from './departures.page';
import { DepartureCardComponent } from '../departure-card/departure-card.component';
import { DepartureItemComponent } from '../departure-item/departure-item.component';
import { MonitoredStationEditorComponent } from '../monitored-station-editor/monitored-station-editor.component';
import { StationPickerComponent } from '../station-picker/station-picker.component';
import { QuickDepartureSearchCardComponent } from '../quick-departure-search-card/quick-departure-search-card.component';
import { DepartureListComponent } from '../departure-list/departure-list.component';
import { TimerComponent } from '../timer/timer.component';
import { DepartureSkeletonsComponent } from '../departure-skeletons/departure-skeletons.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DeparturesPageRoutingModule,
    TranslateModule,
    SharedComponentsModule
  ],
  declarations: [
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

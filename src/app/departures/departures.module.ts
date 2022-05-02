import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DeparturesPageRoutingModule } from './departures-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { SharedComponentsModule } from '../shared/components/shared-components.module';

import { DeparturesPage } from './departures.page';
import { DepartureCardComponent } from './card/favorite/departure-card.component';
import { DepartureItemComponent } from './item/departure-item.component';
import { MonitoredStationEditorComponent } from '../shared/components/station/editor/monitored-station-editor.component';
import { StationPickerComponent } from '../shared/components/station/picker/station-picker.component';
import { QuickDepartureSearchCardComponent } from './card/quick-search/quick-departure-search-card.component';
import { DepartureListComponent } from './list/departure-list.component';
import { TimerComponent } from '../shared/components/timer/timer.component';
import { DepartureSkeletonsComponent } from './item/skeleton/departure-skeletons.component';

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

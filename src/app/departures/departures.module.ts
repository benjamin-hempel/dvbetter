import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DeparturesPageRoutingModule } from './departures-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { SharedComponentsModule } from '../shared/components/shared-components.module';

import { DeparturesPage } from './departures.page';
import { DeparturesCardFavoriteComponent } from './card/favorite/departures-card-favorite.component';
import { DeparturesItemComponent } from './item/departures-item.component';
import { DeparturesStationEditorComponent } from './station-editor/departures-station-editor.component';
import { DeparturesCardQuickSearchComponent } from './card/quick-search/departures-card-quick-search.component';
import { DeparturesListComponent } from './list/departures-list.component';
import { DeparturesItemSkeletonComponent } from './item/skeleton/departures-item-skeleton.component';

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
    DeparturesCardFavoriteComponent,
    DeparturesCardQuickSearchComponent,
    DeparturesItemComponent,
    DeparturesStationEditorComponent,
    DeparturesListComponent,
    DeparturesItemSkeletonComponent
  ]
})
export class DeparturesPageModule {}

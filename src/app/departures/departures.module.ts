import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DeparturesPage } from './departures.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { DeparturesPageRoutingModule } from './departures-routing.module';
import { DepartureCardComponent } from '../departure-card/departure-card.component';
import { DepartureItemComponent } from '../departure-item/departure-item.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    DeparturesPageRoutingModule
  ],
  declarations: [DeparturesPage, DepartureCardComponent, DepartureItemComponent]
})
export class DeparturesPageModule {}

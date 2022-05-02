import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { AppTitleComponent } from './app-title/app-title.component';

@NgModule({
  declarations: [
    AppTitleComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    AppTitleComponent
  ]
})
export class SharedComponentsModule { }

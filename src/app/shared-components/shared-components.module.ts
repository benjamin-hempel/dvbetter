import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppTitleComponent } from '../app-title/app-title.component';
import { IonicModule } from '@ionic/angular';



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

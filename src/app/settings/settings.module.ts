import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { SettingsPageRoutingModule } from './settings-routing.module';
import { SharedComponentsModule } from '../shared-components/shared-components.module';

import { SettingsPage } from './settings.page';
import { LanguagePickerComponent } from '../language-picker/language-picker.component';
import { AboutComponent } from '../about/about.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingsPageRoutingModule,
    TranslateModule,
    SharedComponentsModule
  ],
  declarations: [
    SettingsPage,
    LanguagePickerComponent,
    AboutComponent
  ]
})
export class SettingsPageModule {}

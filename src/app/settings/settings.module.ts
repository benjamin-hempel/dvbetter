import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { SettingsPageRoutingModule } from './settings-routing.module';
import { SharedComponentsModule } from '../shared/components/shared-components.module';

import { SettingsPage } from './settings.page';
import { SettingsLanguagePickerComponent } from './language-picker/settings-language-picker.component';
import { SettingsAboutComponent } from './about/settings-about.component';

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
    SettingsLanguagePickerComponent,
    SettingsAboutComponent
  ]
})
export class SettingsPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { SettingsPageRoutingModule } from './settings-routing.module';

import { SettingsPage } from './settings.page';
import { AppTitleComponent } from '../app-title/app-title.component';
import { LanguagePickerComponent } from '../language-picker/language-picker.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingsPageRoutingModule,
    TranslateModule
  ],
  declarations: [
    SettingsPage,
    AppTitleComponent,
    LanguagePickerComponent
  ]
})
export class SettingsPageModule {}

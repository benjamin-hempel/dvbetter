import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SettingsStorageService } from '../../shared/services/settings-storage.service';

@Component({
  selector: 'app-settings-language-picker',
  templateUrl: './settings-language-picker.component.html',
  styleUrls: ['./settings-language-picker.component.scss'],
})
export class SettingsLanguagePickerComponent implements OnInit {
  currentLanguage: string;

  constructor(
    private translateService: TranslateService,
    private settingsStorageService: SettingsStorageService) {

    }

  ngOnInit() {
    this.currentLanguage = this.settingsStorageService.getLanguage();
  }

  selectLanguage($event: any): void {
    const language = $event.target.value;
    this.settingsStorageService.setLanguage(language);
    this.currentLanguage = language;

    if(language === 'system') {
      this.translateService.use(this.translateService.getBrowserLang());
      return;
    }

    this.translateService.use(language);
  }
}

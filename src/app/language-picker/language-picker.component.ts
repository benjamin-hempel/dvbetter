import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SettingsStorageService } from '../shared/services/settings-storage.service';

@Component({
  selector: 'app-language-picker',
  templateUrl: './language-picker.component.html',
  styleUrls: ['./language-picker.component.scss'],
})
export class LanguagePickerComponent implements OnInit {
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
    }

    this.translateService.use(language);
  }
}

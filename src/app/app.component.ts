import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { SettingsStorageService } from './shared/services/settings-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    public titleService: Title,
    public translateService: TranslateService,
    public settingsStorageService: SettingsStorageService) {
    let language = this.settingsStorageService.getLanguage();

    if(language === 'system') {
      language = this.translateService.getBrowserLang();
    }

    translateService.use(language);
  }
}

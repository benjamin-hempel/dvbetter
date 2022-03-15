import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsStorageService {
  constructor() { }

  getLanguage(): string {
    if(localStorage) {
      return localStorage.language || 'system';
    }
    else {
      return '';
    }
  }

  setLanguage(language: string): void {
    if(localStorage) {
      localStorage.language = language;
    }
  }
}

import { LOCATION_INITIALIZED } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private _language: string;

  constructor() { }

  public init(
    translateService: TranslateService,
    injector: Injector
  ): Promise<void> {
    return new Promise<void>((resolve: any) => {
      // Get the LOCATION_INITIALIZER token
      injector.get(LOCATION_INITIALIZED, Promise.resolve(null)).then(() => {
        // Promise taken... so... let's get the current language
        const navigatorLanguage: string = window.navigator.language;
        const userLanguage: string = navigatorLanguage.split('-')[0];

        // Check for userLanguage against our known languages and fallback to 'en' if no matching
        this._language = /(fr|en)/gi.test(userLanguage) ? userLanguage : 'en';

        // We can now load translations... using TranslateService param
        translateService
          .use(this._language) // Tell the service to use the current language as Observable
          .subscribe(() => {
            console.log(`Translations loaded from ${this._language}`);
            resolve(null); // Promise must be taken
          });
      });
    });
  }
}

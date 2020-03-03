import { Observable } from 'rxjs';
import { LOCATION_INITIALIZED } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Injectable, Injector } from '@angular/core';

/**
 * @name TranslationService
 * @author Aélion - March 2020
 * @version 1.0.1
 *  Update to permit language selection
 */
@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private _language: string;
  private _translateService: TranslateService;

  constructor() { }


  public set language(language: string) {
    this._language = language;
    // Hmmmm, and what next ?
    console.log(`How to switch to new ${this._language} ?`);
    // Maybe using the _switch() method
    this._switch();
  }

  public get language(): string {
    return this._language;
  }

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

        // Store TranslateService for next us
        this._translateService = translateService;

        // We can now load translations... using TranslateService param
        this._switch()
          .subscribe(() => {
              console.log(`Translations loaded from ${this._language}`);
              resolve(null); // Promise must be taken
            });
      });
    });
  }

  private _switch(): Observable<any> {
    return this._translateService.use(this._language);
  }
}

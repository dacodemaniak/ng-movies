import { TranslationService } from './../../../core/services/translation.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss']
})
export class LanguageSwitcherComponent implements OnInit {

  constructor(private translationService: TranslationService) { }

  ngOnInit() {
  }

  public switchTo(language: string): void {
    if (language !== this.translationService.language) {
      this.translationService.language = language;
    }
  }

}

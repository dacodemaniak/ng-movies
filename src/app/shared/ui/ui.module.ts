import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { LanguageSwitcherComponent } from './language-switcher/language-switcher.component';



@NgModule({
  declarations: [TopMenuComponent, FooterComponent, LanguageSwitcherComponent],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    MaterialModule
  ],
  exports: [
    TopMenuComponent,
    FooterComponent,
    LanguageSwitcherComponent
  ]
})
export class UiModule {
  constructor() {
    console.log('UI was loaded');
  }
}

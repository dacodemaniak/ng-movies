import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { UiModule } from './shared/ui/ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';

import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './pages/home/search/search.component';

import { AppConfig } from './core/init/app-config';


export function initializeApp(appConfig: AppConfig) {
  return (): Promise<any> => { 
    return appConfig.init();
  }
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    UiModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    AppConfig,
    { provide: APP_INITIALIZER,useFactory: initializeApp, deps: [AppConfig], multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

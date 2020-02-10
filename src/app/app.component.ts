import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title: string = 'movies';

  public defaultCountry: string = 'us';

  public movies: any[] = [
    {
      title: 'Joker',
      year: 2019,
      country: 'us'
    },
    {
      title: 'Avengers',
      year: 2018,
      country: 'us'
    },
    {
      title: 'Il était une fois dans l\'ouest',
      year: 1975,
      country: 'it'
    }
  ];

  public toggleCountry(): void {
    if (this.defaultCountry == 'us') {
      this.defaultCountry = 'it';
    } else {
      this.defaultCountry = 'us';
    }
  }
}

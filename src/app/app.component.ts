import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title: string = 'movies';

  public defaultCountry: string = 'all';

  public movies: any[] = [
    {
      title: 'Joker',
      year: 2019,
      country: 'us',
      shown: true
    },
    {
      title: 'Avengers',
      year: 2018,
      country: 'us',
      shown: true
    },
    {
      title: 'Il était une fois dans l\'ouest',
      year: 1975,
      country: 'it',
      shown: true
    }
  ];

  public toggleCountry(): void {
    this.defaultCountry = 
      (this.defaultCountry == 'us') ? this.defaultCountry = 'it' 
                                    : this.defaultCountry = 'us';

    this.movies.forEach((movie: any) => {
      movie.shown = movie.country == this.defaultCountry;
    })
  }
}

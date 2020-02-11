import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title: string = 'movies';

  public defaultCountry: string = 'all';

  public movies: any[] = [
    {
      title: 'Joker',
      year: 2019,
      country: {
        iso: 'us',
        text: 'United States'
      },
      shown: true
    },
    {
      title: 'Avengers',
      year: 2018,
      country: {
        iso: 'us',
        text: 'United States'
      },
      shown: true
    },
    {
      title: 'Il était une fois dans l\'ouest',
      year: 1975,
      country: {
        iso: 'it',
        text: 'Italy'
      },
      shown: true
    }
  ];

  public countries: Map<string, any> = new Map<string, any>();

  public constructor() {}

  public ngOnInit(): void {
    this.movies.forEach((movie: any) => {
      this.countries.set(movie.country.iso, movie.country);
    });
  }

  public getCountry(country: string): string {
    const data: any =  this.movies.find((movie: any) => {
      return movie.country.iso == country;
    });
    return data.country.text;
  }

  public toggleCountry(): void {
    this.defaultCountry = 
      (this.defaultCountry == 'us') ? this.defaultCountry = 'it' 
                                    : this.defaultCountry = 'us';

    this.movies.forEach((movie: any) => {
      movie.shown = movie.country == this.defaultCountry;
    })
  }
}

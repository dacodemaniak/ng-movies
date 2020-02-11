import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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

  constructor() { }

  ngOnInit() {
    this.movies.forEach((movie: any) => {
      this.countries.set(movie.country.iso, movie.country);
    });
  }

}

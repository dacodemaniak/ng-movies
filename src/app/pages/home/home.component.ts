import { Component, OnInit } from '@angular/core';
import { MovieService } from './../../core/services/movie.service';

import { take } from 'rxjs/operators';
import { Movie } from './../../core/models/movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public title: string = 'movies';

  public defaultCountry: string = 'all';

  public movies: Movie[] = [];

  public countries: Map<string, any> = new Map<string, any>();

  constructor(
    private movieService: MovieService
  ) { }

  ngOnInit() {


    this.movieService.all()
      .pipe(
        take(1) // Take the only one response of the observable
      )
      .subscribe((response: any[]) => {
        console.log(`Response : ${JSON.stringify(response)}`);
        this.movies = response.map((movie: Movie) => {
          return new Movie().deserialize(movie)
        });
        console.log(`Response : ${JSON.stringify(this.movies)}`);
      });
  }

}

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

  public year: number = 0;
  public years: number[] = [];
  
  public movies: Movie[] = [];

  

  constructor(
    private movieService: MovieService
  ) { }

  ngOnInit() {

    const years: Set<number> = new Set<number>();

    this.movieService.all()
      .pipe(
        take(1) // Take the only one response of the observable
      )
      .subscribe((response: Movie[]) => {
        this.movies = response;
        this.movies.map((movie: Movie) => {
          // Add year to set for further filter
          years.add(movie.year);
        });
        this.years = Array.from(years).sort();
      });
  }

  public receiveMovies($event): void {
    this.movies = $event;
    console.log(`Received ${JSON.stringify(this.movies)}`);
  }
}

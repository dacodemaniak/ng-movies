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

  public movies: Movie[] = [];

  public years: Set<number> = new Set<number>();

  constructor(
    private movieService: MovieService
  ) { }

  ngOnInit() {


    this.movieService.all()
      .pipe(
        take(1) // Take the only one response of the observable
      )
      .subscribe((response: any[]) => {
        this.movies = response.map((movie: Movie) => {
          // Add year to set for further filter
          this.years.add(movie.year);
          return new Movie().deserialize(movie)
        });
        console.log(`Year : ${JSON.stringify(this.years.size)}`);
      });
  }

}

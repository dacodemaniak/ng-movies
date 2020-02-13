import { Component, OnInit } from '@angular/core';
import { MovieService } from './../../core/services/movie.service';

import { take } from 'rxjs/operators';
import { Movie } from './../../core/models/movie';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public title: string = 'movies';

  public year: number = 0;
  public years: number[] = [];
  
  public movies: Observable<Movie[]>;

  constructor(
    private movieService: MovieService
  ) { }

  ngOnInit() {
    this.movies = this.movieService.all();
  }

  public receiveMovies($event): void {
    this.movies = $event;
    console.log(`Received ${JSON.stringify(this.movies)}`);
  }
}

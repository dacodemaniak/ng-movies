import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MovieService } from 'src/app/core/services/movie.service';
import { Movie } from 'src/app/core/models/movie';

import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output() movies: EventEmitter<Movie[]> = new EventEmitter<Movie[]>();
  
  public searchForm: FormGroup;

  constructor(
    private movieService: MovieService,
    private formBuilder: FormBuilder) { }
  
  public get searchTerm(): AbstractControl {
    return this.searchForm.controls.searchTerm;
  }

  public reload(): void {
    if (this.searchTerm.value.trim().length == 0) {
      let movies: Movie[] = [];
      this.movieService.all()
      .pipe(
        take(1) // Take the only one response of the observable
      )
      .subscribe((response: any[]) => {
        movies = response.map((movie: Movie) => {
          return new Movie().deserialize(movie)
        });
        this.movies.emit(movies);
      });
    }
  }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      searchTerm: [
        '', // Default value for the control
        Validators.compose([
          Validators.required,
          Validators.minLength(2)
        ])
      ]
    });
  }

  public doSearch(): void {
    if (this.searchTerm.value.trim().length > 0) {
      let movies: Movie[] = [];
      this.movieService.byTitle(this.searchTerm.value.trim())
        .pipe(
          take(1)
        )
        .subscribe((response: Movie[]) => {
          movies = response.map((movie: any) => {
            return new Movie().deserialize(movie);
          });
          console.log(`Emit : ${JSON.stringify(movies)}`)
          this.movies.emit(movies);
        });

    }
  }

}

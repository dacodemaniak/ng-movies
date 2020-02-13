import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MovieService } from 'src/app/core/services/movie.service';
import { Movie } from 'src/app/core/models/movie';

import { take, map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output() movies: EventEmitter<Observable<Movie[]>> = new EventEmitter<Observable<Movie[]>>();
  
  public searchForm: FormGroup;

  constructor(
    private movieService: MovieService,
    private formBuilder: FormBuilder) { }
  
  public get searchTerm(): AbstractControl {
    return this.searchForm.controls.searchTerm;
  }

  public reload(): void {
    if (this.searchTerm.value.trim().length == 0) {
      this.movies.emit(
        this.movieService.all()
      );
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
    this.searchTerm.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        map(() => {
          console.log('Value of searchTerm : ' + this.searchTerm.value);
          this.doSearch();
        })
      ).subscribe();
  }

  private doSearch(): void {
    if (this.searchTerm.value.trim().length > 0) {
      this.movies.emit(
        this.movieService.byTitle(this.searchTerm.value.trim())
      )
    } else {
      this.movies.emit(this.movieService.all());
    }
  }

}

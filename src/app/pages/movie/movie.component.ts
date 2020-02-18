import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from './../../core/services/movie.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  public movie: any;
  public movieForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private formBuilder: FormBuilder,
  ) { 
    
  }

  public get synopsis(): AbstractControl {
    return this.movieForm.controls.synopsis;
  }

  public doUpdate(): void {
    this.movie.synopsis = this.synopsis.value;

    // Then... call the service to update
    console.log(`Will update : ${JSON.stringify(this.movie)}`);

    this.movieService.update(this.movie)
    .pipe(
      take(1)
    ).subscribe((response: HttpResponse<any>) => {
      console.log(`Update was done with : ${response.status}`);
    });
  }

  ngOnInit() {
    // Build the form...
    this.movieForm = this.formBuilder.group({
      synopsis: [
        '',
        Validators.required
      ]
    });

    this.route.data.subscribe((data: {movie: any}) => {
        this.movie = data.movie;
        this.synopsis.setValue(this.movie.synopsis)
    });
  }

}

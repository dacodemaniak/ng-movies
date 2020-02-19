import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieService } from './../../core/services/movie.service';

import { take } from 'rxjs/operators';
import { Movie } from './../../core/models/movie';
import { Observable, Subscription } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public title: string = 'movies';

  public year: number = 0;
  public years: number[] = [];
  private yearSubscription: Subscription;
  
  public movies: Observable<Movie[]>;

  constructor(
    public movieService: MovieService,
    public userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.movies = this.movieService.all();
    
    this.yearSubscription = this.movieService.years$
      .subscribe((_years) => {
        console.log('Years was updated : ' + JSON.stringify(_years));
        this.years = _years;
    });
  }

  ngOnDestroy(): void {
    this.yearSubscription.unsubscribe();
  }
  
  public moveTo(idMovie: number): void {
    if( this.userService.user && this.userService.user !== null) {
      this.router.navigate(['../','movie', idMovie]);
    } else {
      // Load a toast and route to login
      const snack: MatSnackBarRef<SimpleSnackBar> = this.snackBar.open(
        'You have to login or create an account before',
        null,
        {
          duration: 2500
        }
      );
      snack.afterDismissed().subscribe((status: any) => {
        const navigationExtras: NavigationExtras = {state: {movie: idMovie}};
        this.router.navigate(['../', 'login'], navigationExtras);
      });
      
    }
  }

  public receiveMovies($event): void {
    this.movies = $event;
    console.log(`Received ${JSON.stringify(this.movies)}`);
  }
}

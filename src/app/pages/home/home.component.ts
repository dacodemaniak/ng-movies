import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieService } from './../../core/services/movie.service';

import { take } from 'rxjs/operators';
import { Movie } from './../../core/models/movie';
import { Observable, Subscription } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

import { WebSocketSubject } from 'rxjs/webSocket';

import { environment } from './../../../environments/environment';
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

  private socket$: WebSocketSubject<any>;

  constructor(
    public movieService: MovieService,
    public userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.socket$ = new WebSocketSubject<any>(environment.wssAddress);
    this.socket$.subscribe((socketMessage: any) => {
      console.log(`Something come from wsServer : ${JSON.stringify(socketMessage)}`)
    },
    (err) => console.error('Exception raised : ' + JSON.stringify(err)),
    () => console.warn('Completed!')
    );
    

    this.movies = this.movieService.all();
    
    this.yearSubscription = this.movieService.years$
      .subscribe((_years) => {
        this.years = _years;
    });
  }

  ngOnDestroy(): void {
    this.yearSubscription.unsubscribe();
  }
  
  public likeIt(movie: Movie): void {
    movie.like += 1;

    // Emit a new update to ws...
    const message: any = {
      message: 'like',
      data: movie
    };
    this.socket$.next(message);
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

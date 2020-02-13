import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Movie } from './../models/movie';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public async allMovies() {
    const apiRoute: string = `${environment.apiRoot}movie`;
    try {
      const movies = await fetch(apiRoute);
      console.log(`Movies : ${JSON.stringify(movies.body)}}`);
    } catch(error) {
      // If something went wrong
      console.log('Something went wrong : ' + error);
    }
  }

  public all(): Observable<Movie[]> {
    const apiRoute: string = `${environment.apiRoot}movie`;
    return this.httpClient.get<Movie[]>(
      apiRoute
    )
    .pipe(
      take(1),
      map((response) => {
        return response.map((item) => new Movie().deserialize(item))
      })
    );
  }

  public byTitle(title: string): Observable<Movie[]> {
    const apiRoute: string = `${environment.apiRoot}movie/title/${title}`;
    
    return this.httpClient.get<any[]>(
      apiRoute
    )
    .pipe(
      take(1),
      map((response) => {
        return response.map((item) => new Movie().deserialize(item))
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Movie } from './../models/movie';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private _years: Set<number> = new Set<number>();
  public years$: BehaviorSubject<number[]> = 
    new BehaviorSubject<number[]>(Array.from(this._years).sort());

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
    this._years = new Set<number>();
    const apiRoute: string = `${environment.apiRoot}movie`;
    return this.httpClient.get<Movie[]>(
      apiRoute
    )
    .pipe(
      take(1),
      map((response) => {
        return response.map((item) => 
         {
           this._years.add(item.year);
           this.years$.next(Array.from(this._years).sort());
           return new Movie().deserialize(item)
          });
          
      })
    );
  }

  public byTitle(title: string): Observable<Movie[]> {
    const apiRoute: string = `${environment.apiRoot}movie/title/${title}`;
    this._years = new Set<number>();

    return this.httpClient.get<any[]>(
      apiRoute
    )
    .pipe(
      take(1),
      map((response) => {
        return response.map((item) => {
          this._years.add(item.year);
          this.years$.next(Array.from(this._years).sort());
            return new Movie().deserialize(item)
          }
        );
      })
    );
  }

  public byId(id: number): Observable<any> {
    const apiRoot: string = `${environment.apiRoot}movie/${id}`;
    return this.httpClient.get<any>(
      apiRoot
    )
    .pipe(
      take(1),
      map((response) => {
        return response;
      })
    );
  }

  public update(movie: any): Observable<HttpResponse<any>> {
    const apiRoot: string = `${environment.apiRoot}movie/modify`;
    
    return this.httpClient.put(
      apiRoot,
      movie,
      {
        observe: 'response'
      }
    ).pipe(
      take(1),
      map((response: HttpResponse<any>) => {
        return response;
      })
    )
  }
}

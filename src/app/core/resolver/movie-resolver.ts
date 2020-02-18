import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { catchError, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MovieResolver implements Resolve<any> {
    public constructor(private movieService: MovieService){}

    public resolve(
        route: import("@angular/router").ActivatedRouteSnapshot, 
        state: import("@angular/router").RouterStateSnapshot
    ) {
        const id: number = parseInt(route.paramMap.get('id'));

        console.log(`Hello resolver : ${id}`);

        this.movieService.byId(id)
            .pipe(
                take(1),
                catchError((error: any, caught: any): Observable<any> => {
                    console.log(`Resolver failed with : ${JSON.stringify(error)}`);
                    
                    return of(null);
                })
            ).subscribe();
    }

}

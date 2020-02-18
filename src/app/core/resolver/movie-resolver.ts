import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MovieResolver implements Resolve<any> {
    public resolve(
        route: import("@angular/router").ActivatedRouteSnapshot, 
        state: import("@angular/router").RouterStateSnapshot
    ) {
        console.log(`Hello resolver`);
    }

}

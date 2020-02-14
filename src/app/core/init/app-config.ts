import { Injectable } from '@angular/core';

@Injectable()

export class AppConfig {
    public constructor() {}

    public init(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            console.log("AppInitService.init() called");
            // My job here... well, let's try to get a user  
            setTimeout(() => {
                console.log('AppInitService Finished');
                resolve();
            }, 2000);
 
        });        
    }
}

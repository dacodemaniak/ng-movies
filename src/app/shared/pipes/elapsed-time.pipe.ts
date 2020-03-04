import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

import * as moment from 'moment';

@Pipe({
  name: 'elapsedTime'
})
export class ElapsedTimePipe implements PipeTransform {
  private static readonly API: string = 'http://worldclockapi.com/api/json/utc/now';

  public constructor(
    private httpClient: HttpClient
  ) {}

  transform(value: any, ...args: any[]): Promise<string> {
    return new Promise<string>((resolve) => {
      this.httpClient.get<any>(
        ElapsedTimePipe.API
      ).pipe(
        take(1)
      ).subscribe((utcDateTime: any) => {
        const now: moment.Moment = moment(utcDateTime.currentDateTime);
        const elapsedTime: number = parseInt(now.format('YYYY')) - value;

        resolve(`Sorti il y a ${elapsedTime} an(s)`);
      });
    });
  }

}

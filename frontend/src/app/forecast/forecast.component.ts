import { Component, inject, input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Observable, catchError, map, of, startWith, switchMap } from 'rxjs';

import { ForeCast, ForecastService } from './forecast.service';

export type ForecastState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'loaded'; rows: ForeCast[] }
  | { status: 'not-found' }
  | { status: 'error' };


@Component({
  selector: 'app-forecast',
  standalone: false,
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent {

  private forecastService = inject(ForecastService);

  date = input<string>('');

  displayedColumns: string[] = ['PERIOD', 'CONDITIONS', 'TEMPERATURE', 'WINDS', 'PRECIPITATION', 'UV'];

  // switchMap drops a still-pending request when a new date is searched
  state = toSignal(
    toObservable(this.date).pipe(switchMap(date => this.load(date))),
    { initialValue: { status: 'idle' } as ForecastState }
  );

  private load(date: string): Observable<ForecastState> {
    if (!date) {
      return of({ status: 'idle' });
    }

    return this.forecastService.getByDate(date).pipe(
      map((rows): ForecastState => ({ status: 'loaded', rows })),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return of<ForecastState>({ status: 'not-found' });
        }
        console.error('Failed to load the forecast for ' + date, error);
        return of<ForecastState>({ status: 'error' });
      }),
      startWith<ForecastState>({ status: 'loading' })
    );
  }

}

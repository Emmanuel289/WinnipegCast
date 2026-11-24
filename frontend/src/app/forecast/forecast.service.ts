import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface ForeCast {
  date_time_local: string;
  period_index: number;
  period_string: string;
  cloudprecip: string;
  temperatures: string;
  winds: string;
  precipitation: string;
  uv: string;
}

export interface ForecastRange {
  first: string;
  last: string;
}

@Injectable({ providedIn: 'root' })
export class ForecastService {

  private http = inject(HttpClient);

  // Latest forecast issued on the given day (YYYY-MM-DD), one row per period
  getByDate(date: string): Observable<ForeCast[]> {
    return this.http.get<ForeCast[]>('/api/v0/forecast', { params: { date } });
  }

  // First and last days (YYYY-MM-DD) that have a forecast in the database
  getRange(): Observable<ForecastRange> {
    return this.http.get<ForecastRange>('/api/v0/forecasts/range');
  }
}

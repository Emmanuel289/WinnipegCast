import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { ForeCast, ForecastRange, ForecastService } from './forecast.service';

describe('ForecastService', () => {
  let service: ForecastService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ provideHttpClient(), provideHttpClientTesting() ]
    });
    service = TestBed.inject(ForecastService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('requests the forecast for a day and returns the rows', () => {
    const rows: ForeCast[] = [
      { date_time_local: '2021-06-24 11:00:00 CDT', period_index: 1, period_string: 'Today', cloudprecip: 'Mainly sunny.', temperatures: 'High 28.', winds: '', precipitation: '', uv: '' },
    ];
    let result: ForeCast[] | undefined;

    service.getByDate('2021-06-24').subscribe(value => result = value);

    const request = httpTesting.expectOne(req => req.url === '/api/v0/forecast');
    expect(request.request.method).toBe('GET');
    expect(request.request.params.get('date')).toBe('2021-06-24');
    request.flush(rows);

    expect(result).toEqual(rows);
  });

  it('requests the first and last forecast dates', () => {
    let result: ForecastRange | undefined;

    service.getRange().subscribe(value => result = value);

    const request = httpTesting.expectOne('/api/v0/forecasts/range');
    expect(request.request.method).toBe('GET');
    request.flush({ first: '2016-01-01', last: '2026-11-24' });

    expect(result).toEqual({ first: '2016-01-01', last: '2026-11-24' });
  });
});

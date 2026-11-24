import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';

import { AppComponent } from './app.component';
import { ForecastComponent } from './forecast/forecast.component';
import { MATERIAL_MODULES } from './material';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let httpTesting: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormsModule, ...MATERIAL_MODULES ],
      declarations: [ AppComponent, ForecastComponent ],
      providers: [ provideHttpClient(), provideHttpClientTesting(), provideNativeDateAdapter() ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    httpTesting = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('limits the date picker to the range from the API and searches the last date', async () => {
    httpTesting.expectOne('/api/v0/forecasts/range').flush({ first: '2016-01-01', last: '2026-11-24' });
    await fixture.whenStable();

    const forecastRequest = httpTesting.expectOne(req => req.url === '/api/v0/forecast');
    expect(forecastRequest.request.params.get('date')).toBe('2026-11-24');
    forecastRequest.flush([]);
    await fixture.whenStable();

    const input: HTMLInputElement = fixture.nativeElement.querySelector('input[name="forecastDate"]');
    expect(input.min).toBe('2016-01-01');
    expect(input.max).toBe('2026-11-24');
  });

  it('searches the picked date as YYYY-MM-DD', async () => {
    httpTesting.expectOne('/api/v0/forecasts/range').flush({ first: '2016-01-01', last: '2026-11-24' });
    await fixture.whenStable();
    httpTesting.expectOne(req => req.url === '/api/v0/forecast').flush([]);
    await fixture.whenStable();

    fixture.componentInstance.selectedDate.set(new Date(2018, 6, 5));
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');
    button.click();
    await fixture.whenStable();

    const forecastRequest = httpTesting.expectOne(req => req.url === '/api/v0/forecast');
    expect(forecastRequest.request.params.get('date')).toBe('2018-07-05');
    forecastRequest.flush([]);
  });

  it('shows a message when the date range cannot be loaded', async () => {
    httpTesting.expectOne('/api/v0/forecasts/range')
      .flush({ message: 'down' }, { status: 500, statusText: 'Server Error' });
    await fixture.whenStable();

    const element: HTMLElement = fixture.nativeElement;
    expect(element.textContent).toContain('Could not load the available forecast dates.');
    expect(element.querySelector('form')).toBeNull();
  });
});

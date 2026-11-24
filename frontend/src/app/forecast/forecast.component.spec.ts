import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { MATERIAL_MODULES } from '../material';

import { ForecastComponent } from './forecast.component';
import { ForeCast } from './forecast.service';

const ROWS: ForeCast[] = [
  { date_time_local: '2021-06-24 11:00:00 CDT', period_index: 1, period_string: 'Today', cloudprecip: 'Mainly sunny.', temperatures: 'High 28.', winds: 'Wind northwest 20 km/h.', precipitation: '', uv: 'UV index 8 or very high.' },
  { date_time_local: '2021-06-24 11:00:00 CDT', period_index: 2, period_string: 'Tonight', cloudprecip: 'Clear.', temperatures: 'Low 13.', winds: '', precipitation: '', uv: '' },
];

describe('ForecastComponent', () => {
  let component: ForecastComponent;
  let fixture: ComponentFixture<ForecastComponent>;
  let httpTesting: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ...MATERIAL_MODULES ],
      declarations: [ ForecastComponent ],
      providers: [ provideHttpClient(), provideHttpClientTesting() ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastComponent);
    component = fixture.componentInstance;
    httpTesting = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders one row per forecast period returned by the API', async () => {
    fixture.componentRef.setInput('date', '2021-06-24');
    await fixture.whenStable();

    const request = httpTesting.expectOne(req => req.url === '/api/v0/forecast');
    expect(request.request.params.get('date')).toBe('2021-06-24');
    request.flush(ROWS);
    await fixture.whenStable();

    const element: HTMLElement = fixture.nativeElement;
    const rows = element.querySelectorAll('tr.mat-mdc-row');
    expect(rows.length).toBe(2);
    expect(rows[0].textContent).toContain('Today');
    expect(rows[0].textContent).toContain('High 28.');
    expect(element.textContent).toContain('Forecast issued 2021-06-24 11:00:00 CDT');
  });

  it('shows a message when no forecast exists for the date', async () => {
    fixture.componentRef.setInput('date', '1999-01-01');
    await fixture.whenStable();

    httpTesting.expectOne(req => req.url === '/api/v0/forecast')
      .flush({ message: 'No forecast was issued on 1999-01-01' }, { status: 404, statusText: 'Not Found' });
    await fixture.whenStable();

    const element: HTMLElement = fixture.nativeElement;
    expect(element.textContent).toContain('No forecast was issued on 1999-01-01.');
    expect(element.querySelector('table')).toBeNull();
  });
});

import { Component, OnInit, computed, inject, signal } from '@angular/core';

import { ForecastRange, ForecastService } from './forecast/forecast.service';

// The API uses calendar days (YYYY-MM-DD). Local date parts are used on purpose:
// `new Date('2026-11-24')` and `toISOString()` work in UTC and can shift the day by one.
export function parseDay(day: string): Date {
  const [year, month, date] = day.split('-').map(Number);
  return new Date(year, month - 1, date);
}

export function formatDay(date: Date): string {
  const pad = (value: number) => String(value).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'WinCast';

  private forecastService = inject(ForecastService);

  range = signal<ForecastRange | null>(null);
  rangeError = signal(false);

  minDate = computed(() => { const range = this.range(); return range ? parseDay(range.first) : null; });
  maxDate = computed(() => { const range = this.range(); return range ? parseDay(range.last) : null; });

  selectedDate = signal<Date | null>(null);
  searchedDate = signal('');

  ngOnInit(): void {
    this.forecastService.getRange().subscribe({
      next: range => {
        this.range.set(range);
        this.selectedDate.set(parseDay(range.last));
        this.searchedDate.set(range.last);
      },
      error: error => {
        console.error('Failed to load the forecast date range', error);
        this.rangeError.set(true);
      }
    });
  }

  search(): void {
    const selected = this.selectedDate();
    if (selected) {
      this.searchedDate.set(formatDay(selected));
    }
  }
}

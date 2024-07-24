import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {catchError, map, Observable, of, tap} from "rxjs";

import {CurrencyService} from "../../services";
import {CurrencyRate, CurrencyType} from "../../services/currency/currency.types";
import {get} from "../../libs/helpers";

@Component({
  selector: 'app-currency-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './currency-widget.component.html',
  styleUrl: './currency-widget.component.scss'
})
export class CurrencyWidgetComponent implements OnInit {
  @Input('value') value: number = 1;
  @Input('basic') basic: CurrencyType = '';
  @Input('currency') currency: CurrencyType = '';

  error: string = '';
  rate$: Observable<number> = new Observable<number>();
  constructor(
    private currencyService: CurrencyService
  ) {}

  ngOnInit() {
    this.rate$ = this.getRate(this.value, this.basic, this.currency);
  }

  public getRate(value: number, basic: CurrencyType, currency: CurrencyType): Observable<any> {
    return this.currencyService.getCurrencyRate(basic, [currency])
      .pipe(
        tap(() => {
          this.error = '';
        }),
        map((response: CurrencyRate) => {
          return response[currency].value;
        }),
        map((rate: number) => {
          return value / rate;
        }),
        catchError((error: any) => {
          this.error = get(error, ['error', 'message'], '');
          return of(null);
        })
      );
  }
}

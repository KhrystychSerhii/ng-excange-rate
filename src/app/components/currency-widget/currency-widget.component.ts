import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {map, Observable} from "rxjs";

import {CurrencyService} from "../../services";
import {CurrencyRate, CurrencyRateInfo, CurrencyType} from "../../services/currency/currency.types";




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
        map((response: CurrencyRate) => {
          return response[currency].value;
        }),
        map((rate: number) => {
          return value / rate;
        })
      );
  }
}

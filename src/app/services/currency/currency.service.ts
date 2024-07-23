import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {map, Observable, of, tap} from "rxjs";

// types
import {CurrencyListItem, CurrencyType, CurrencyRate, CurrencyRateInfo} from "./currency.types";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = this.getHeaders();
  }

  getCurrentRate(): Observable<number> {
    return of(40);
  }

  getList(): Observable<Record<string, CurrencyListItem>> {
    // https://app.currencyapi.com/
    return this.http.get('https://api.currencyapi.com/v3/currencies', { headers: this.headers }).pipe(
      map((response: any) => {
        if (!response || !response.data) {
          return [];
        }
        return response.data;
      })
    );
  }

  getCurrencyRate(baseCurrency: CurrencyType, currencies?: Array<CurrencyType>): Observable<CurrencyRate> {
    return this.http.get('https://api.currencyapi.com/v3/latest', { headers: this.headers, params: { base_currency: baseCurrency, currencies: currencies || [] } })
      .pipe(
        map((response: any) => {
          console.log('c', response.data);
          return response.data;
        }
      )
    );
    //return of(41.2);
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'apikey': 'cur_live_G9rPw8XoBE9AQdnrPzXgFUdvA8iE1u4zi3ZuZZuO'
    });
  }
}

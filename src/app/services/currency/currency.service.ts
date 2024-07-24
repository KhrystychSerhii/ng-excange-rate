import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {map, Observable, of, tap} from "rxjs";

// types
import {CurrencyListItem, CurrencyType, CurrencyRate, CurrencyRateInfo} from "./currency.types";

import { environment } from "../../../environments/environments"

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
    return this.http.get(`${environment.currencyapi}/currencies`, { headers: this.headers }).pipe(
      map((response: any) => {
        if (!response || !response.data) {
          return [];
        }
        return response.data;
      })
    );
  }

  getCurrencyRate(baseCurrency: CurrencyType, currencies?: Array<CurrencyType>): Observable<CurrencyRate> {
    return this.http.get(`${environment.currencyapi}/latest`, { headers: this.headers, params: { base_currency: baseCurrency, currencies: currencies || [] } })
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
      'apikey': environment.currencyapikey
    });
  }
}

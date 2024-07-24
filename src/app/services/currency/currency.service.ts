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
  constructor(private http: HttpClient) {}

  getList(): Observable<Record<string, CurrencyListItem>> {
    return this.http.get(`${environment.currencyapi}/currencies`).pipe(
      map((response: any) => {
        if (!response || !response.data) {
          return [];
        }
        return response.data;
      })
    );
  }

  getCurrencyRate(baseCurrency: CurrencyType, currencies?: Array<CurrencyType>): Observable<CurrencyRate> {
    return this.http.get(`${environment.currencyapi}/latest`, { params: { base_currency: baseCurrency, currencies: currencies || [] } })
      .pipe(
        map((response: any) => {
          return response.data;
        }
      )
    );
  }
}

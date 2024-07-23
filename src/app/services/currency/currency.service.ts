import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {map, Observable, of} from "rxjs";

// types
import { CurrencyListItem } from "./currency.types";

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

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'apikey': environment.currencyapikey
    });
  }
}

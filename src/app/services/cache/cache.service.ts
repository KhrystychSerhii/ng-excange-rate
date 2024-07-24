import { Injectable } from '@angular/core';


import {CacheResponse} from "./cache.types";

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache = new Map<string, any>();
  private CACHE_STORE_TIME: number = 5000; // ms

  constructor() { }

  set(key: string, value: any) {
    const now: Date = new Date();
    const timestamp: number = now.getTime();
    this.cache.set(key, { body: value, timestamp });
  }

  get(key: string): CacheResponse | null {
    return this.cache.get(key) || null;
  }

  isOutdated(cacheResponse: CacheResponse): boolean {
    const date: Date = new Date();
    const timestamp: number = date.getTime();
    return (timestamp - cacheResponse.timestamp) > this.CACHE_STORE_TIME;
  }

  // can be used for force query
  clear(key?: string): void {
    if (!key) {
      this.cache.clear();
    } else {
      this.cache.set(key, null);
    }

  }
}

import {HttpInterceptorFn, HttpResponse} from '@angular/common/http';
import {inject} from "@angular/core";
import {of, tap} from "rxjs";

import {CacheService} from "../../services";


export const cacheInterceptor: HttpInterceptorFn = (req, next) => {
  const cacheService = inject(CacheService);

  if (req.method !== "GET") {
    return next(req);
  }

  const cacheResponse = cacheService.get(req.urlWithParams);
  if (cacheResponse) {
    return of(new HttpResponse({ body: cacheResponse }));
  }

  return next(req).pipe(
    tap(event => {
      if (event instanceof HttpResponse) {
        cacheService.set(req.urlWithParams, event.body);
      }
    })
  );
};

import {HttpInterceptorFn, HttpResponse} from '@angular/common/http';
import {inject} from "@angular/core";
import {of, tap} from "rxjs";

import {CacheService, CacheResponse} from "../../services";

export const cacheInterceptor: HttpInterceptorFn = (req, next) => {
  const cacheService = inject(CacheService);

  if (req.method !== "GET") {
    return next(req);
  }

  const cacheResponse: CacheResponse | null = cacheService.get(req.urlWithParams);
  if (cacheResponse && !cacheService.isOutdated(cacheResponse)) {
    return of(new HttpResponse({ body: cacheResponse.body }));
  }

  return next(req).pipe(
    tap(event => {
      if (event instanceof HttpResponse) {
        cacheService.set(req.urlWithParams, event.body);
      }
    })
  );
};

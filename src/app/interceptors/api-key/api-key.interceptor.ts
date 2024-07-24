import { HttpInterceptorFn } from '@angular/common/http';


import {environment} from "../../../environments/environments";

export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {

  const reqWithApiKeys = req.clone({
    setHeaders: {
      'apikey': environment.currencyapikey
    }
  });

  return next(reqWithApiKeys);
};

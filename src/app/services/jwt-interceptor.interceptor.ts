import { HttpInterceptorFn } from '@angular/common/http';

import { inject } from '@angular/core';
import { LoginService } from './login.service';

export const jwtInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const loginService=inject(LoginService);
  const token = loginService.userToken;

  if(token){
    req=req.clone(
      {
        setHeaders: {
          'Content-Type':'application/json',
          'Accept':'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    )
  }
  return next(req);
};

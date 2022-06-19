import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LoginInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      return next.handle(request);
    }
    //Set user owned JWT token for use in http requests
    const newRequest = request.clone({
      params: new HttpParams().set('JWT', user.user.JWTToken),
    });
    return next.handle(newRequest);
  }
}

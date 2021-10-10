import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private token:TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.headers.get("skip"))
      return next.handle(request);
    else{
      request = request.clone({
        setHeaders:{
          Authorization:`Bearer ${ this.token.getToken() }`,
        },
      })
      return next.handle(request);
    }
  }
}

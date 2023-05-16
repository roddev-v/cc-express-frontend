import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from 'rxjs';
import {CookieService} from "ngx-cookie-service";

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor(
    public cookieService: CookieService
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (this.cookieService.check('cc-url-shortener-token')) {
      const copyReq = request.clone({
        headers: request.headers.set('token', this.cookieService.get('cc-url-shortener-token'))
      })

      return next.handle(copyReq);
    }

    return next.handle(request);
  }
}

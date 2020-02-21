import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHeaders, HttpRequest } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private userService: UserService) { }

  intercept(req: import("@angular/common/http").HttpRequest<any>, next: import("@angular/common/http").HttpHandler): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {
    
    let token: String = null;
    
    if (this.userService.user) {
      token = this.userService.user.token;
    }

    if (token) {
      let newHeaders: HttpHeaders = req.headers;
      const bearer: string = "Bearer " + token;

      // Clone the original request (immutable)
      const newRequest: HttpRequest<any> = req.clone(
          { setHeaders: {
              Authorization: bearer
            }
          });

      // Finally release the updated request
      return next.handle(newRequest);

    }
    return next.handle(req);
  }
}

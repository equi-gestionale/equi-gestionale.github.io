import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { Router } from '@angular/router';

const externalHosts = {
    GOOGLE: "googleapis.com"
  };

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        console.log('JwtInterceptor.intercept - IN');
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token && request.url.indexOf(externalHosts.GOOGLE)==-1) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }
        console.log(request.headers);
        return next.handle(request).pipe(
            catchError(err => this.handleAuthError(err))
            );
    }

    private handleAuthError(err: HttpErrorResponse): Observable<any> {
        console.log('JwtInterceptor.handleAuthError - IN');
        if (err.status === 401 || err.status === 403) {
            localStorage.removeItem('currentUser');
            this.router.navigateByUrl(`/login`);
        }
        return Observable.throw(err.message);
    }

}
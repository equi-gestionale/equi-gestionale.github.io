import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService, TOKEN_NAME } from './services/authentication.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.authenticationService.isTokenExpired()) {
            // logged in so return true
            return true;
        }
        // not logged in or token expired so redirect to login page with the return url
        if(this.authenticationService.currentUser){
            this.authenticationService.logout();
        }
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }

}
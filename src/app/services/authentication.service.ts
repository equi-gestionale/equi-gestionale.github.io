import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../user';
import { environment } from '../../environments/environment';
import * as jwt_decode from 'jwt-decode';

export const TOKEN_NAME: string = 'currentUser';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  private enVar;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(this.getToken()));
      this.currentUser = this.currentUserSubject.asObservable();
      this.enVar = environment;
  }

  public get currentUserValue(): User {
      return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    console.log('authService.login - IN');
      return this.http.post<any>(this.enVar.apiEquilibristiWs+`/api/v1/users/authenticate`, { username, password })
          .pipe(map(user => {
              // login successful if there's a jwt token in the response
              if (user && user.token) {
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem(TOKEN_NAME, JSON.stringify(user));
                  this.currentUserSubject.next(user);
              }
              return user;
            })
          );
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem(TOKEN_NAME);
      this.currentUserSubject.next(null);
  }

  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_NAME, token);
  }

  setTokenInCurrentUser(token: string){
    this.currentUserSubject.value.token=token;
  }

  getTokenExpirationDate(token?: string): number {
    console.log('authService.getTokenExpirationDate - IN');
    if(!token) token = this.getToken();
    const decoded = jwt_decode(token);
    if (decoded.exp === undefined) return null;
    return decoded.exp;
  }

  isTokenExpired(token?: string): boolean {
    console.log('authService.isTokenExpired - IN');
    if(!token) token = this.getToken();
    if(!token) return true;
    const expTime = this.getTokenExpirationDate(token);
    if(expTime === undefined){
      return false;
    } 
    return (Date.now() >= expTime * 1000);
  }
}

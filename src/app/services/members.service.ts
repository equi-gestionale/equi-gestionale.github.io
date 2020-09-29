import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Member, MembersPage } from '../models/member.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  private BASE_URL = environment.apiEquilibristiWs+'/api/v1/library/members';
  private MAX_PAGE_SIZE = 10000;

  constructor(private httpClient: HttpClient) {}

  insertMember(member: Member): Observable<Member>{
    return this.httpClient.post<Member>(this.BASE_URL, member, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateMember(member: Member): Observable<Member>{
    return this.httpClient.put<Member>(this.BASE_URL+"/"+member.id, member, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteMember(member: Member): Observable<Member>{
    return this.httpClient.delete<Member>(this.BASE_URL+"/"+member.id, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  search(query: string, page:number, size:number): Observable<MembersPage>{
    return this.httpClient.get<MembersPage>(this.BASE_URL+"?q="+query+"&page="+page+"&size="+size, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  getAllMembers(): Observable<MembersPage>{
    return this.httpClient.get<MembersPage>(this.BASE_URL+"?q=&page=0&size="+this.MAX_PAGE_SIZE, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code. The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError(error);
  }
}

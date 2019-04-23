import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import { Book } from '../models/book.model';
import { GoogleResponse } from '../models/googleResponse.model';

@Injectable({
  providedIn: 'root'
})
export class GoogleBookService {

  private enVar;
  private BASE_URL = 'https://www.googleapis.com/books/v1/volumes'
  
  constructor(private httpClient: HttpClient) {
    this.enVar = environment;
   }

   private extractData(res: Response) {
    let googleResponse = new GoogleResponse().deserialize(res);
    return googleResponse.items[0].volumeInfo;
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

  search_isbn(isbn: string): Observable<Book>{
    return this.httpClient.get(this.BASE_URL + '?q='+isbn).pipe(
      map(this.extractData),
      catchError(this.handleError)
      );
  } 

}

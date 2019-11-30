import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Book, BooksPage } from '../models/book.model';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private BASE_URL = environment.apiEquilibristiWs+'/api/v1/library/books';

  constructor(private httpClient: HttpClient) {}

  insertBook(book: Book): Observable<Book>{
    return this.httpClient.post<Book>(this.BASE_URL, book, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  searchIsbn(isbn: string): Observable<BooksPage>{
    return this.httpClient.get<BooksPage>(this.BASE_URL+"?isbn="+isbn, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteIsbn(id: string): Observable<Book>{
    return this.httpClient.delete<Book>(this.BASE_URL+"/"+id, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteIsbnInPosition(id: string, pos: string): Observable<Book>{
    return this.httpClient.delete<Book>(this.BASE_URL+"/"+id+"?position="+pos, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  search(query: string, page:number, size:number): Observable<BooksPage>{
    return this.httpClient.get<BooksPage>(this.BASE_URL+"?q="+query+"&page="+page+"&size="+size, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  lastsInserted(page:number, size:number): Observable<BooksPage>{
    return this.httpClient.get<BooksPage>(this.BASE_URL+"?page="+page+"&size="+size+"&sort=libraryMetadata.registrationDates", httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  lastsDeleted(page:number, size:number): Observable<BooksPage>{
    return this.httpClient.get<BooksPage>(this.BASE_URL+"?page="+page+"&size="+size+"&sort=libraryMetadata.deliveryDates", httpOptions)
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

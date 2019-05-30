import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { _keyValueDiffersFactory } from '@angular/core/src/application_module';
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Book } from '../models/book.model';
import { GoogleResponse, GoogleVolume } from '../models/googleResponse.model';

@Injectable({
  providedIn: 'root'
})
export class GoogleBookService {

  private enVar;
  private BASE_URL = 'https://www.googleapis.com/books/v1/volumes'
  
  constructor(private httpClient: HttpClient) {
    this.enVar = environment;
   }

  searchIsbn(isbn: string): Observable<Book>{
    return this.httpClient.get(this.BASE_URL + '?q='+isbn).pipe(
      map(data => this.extractData(data, isbn)),
      catchError(this.handleError)
      );
  } 

  private extractData(res: any, isbn: string) {
    let book = new Book();
    let googleResponse = new GoogleResponse().deserialize(res);
    if(googleResponse.totalItems!=0){
      let i = this.getResultIndex(googleResponse.items, isbn);
      let volumeInfo = googleResponse.items[i].volumeInfo;
      book.authors = volumeInfo.authors.join(", ");;
      book.description = volumeInfo.description;
      book.language = volumeInfo.language;
      book.pageCount = volumeInfo.pageCount;
      book.publisher = volumeInfo.publisher;
      book.publishedDate = new Date(volumeInfo.publishedDate);
      book.title = volumeInfo.title;
      book.subtitle = volumeInfo.subtitle;
      volumeInfo.industryIdentifiers.forEach(function(iid){
        if(iid.type=='ISBN_13'){
          book.isbn = iid.identifier;
        }
        if(iid.type=='ISBN_10'){
          book.isbn = iid.identifier;
        }
      });
    }
    return book;
  }

  private getResultIndex(googleBooks:GoogleVolume[], isbn: string){
    let index = 0;
    googleBooks.forEach(function(item, i){
      console.log(item.volumeInfo.title);
      item.volumeInfo.industryIdentifiers.forEach(function(innerItem){
        console.log(innerItem.type);
        if(innerItem.identifier == isbn){
          console.log("nell'if");
          index = i;
        }
      });
    });
    return index;
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

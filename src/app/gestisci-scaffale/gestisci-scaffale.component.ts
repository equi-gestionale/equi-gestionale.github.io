import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';
import { Book } from '../models/book.model';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-gestisci-scaffale',
  templateUrl: './gestisci-scaffale.component.html',
  styleUrls: ['./gestisci-scaffale.component.css']
})
export class GestisciScaffaleComponent implements OnInit {

  books$!: Observable<Book[]>;
  showErrorAlert: boolean = false;
  showSuccess: boolean = false;
  showSuccessMessage: String;
  bookFound: boolean | undefined;
  private searchTerms = new BehaviorSubject<string>("");

  constructor(private booksService: BooksService) { }

  cercaScaffale(term: string){
    this.searchTerms.next(term);
  }

  spostaScaffale(nuovoScaffale: string){
    this.showErrorAlert = false;
    this.showSuccess = false;
    this.booksService.moveBooksByPosition(this.searchTerms.getValue(), nuovoScaffale).subscribe(
      (res) =>{
        this.showSuccess = true; 
        this.showSuccessMessage = "Spostamento avvenuto con successo dalla posizione "+this.searchTerms.getValue()+" alla posizione "+nuovoScaffale;
        this.searchTerms.next("");
      },
      (error) => {this.showErrorAlert=true; }
    );
  }

  ngOnInit(): void {
    this.books$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter((val)=>val!=""),
      switchMap((term: string) => {
        this.showErrorAlert = false;
        this.showSuccess = false;
        return this.booksService.searchBooksByPosition(term).pipe(
          tap(res => res.length>0 ? this.bookFound = true : this.bookFound = false),
          catchError(e=>{
            this.showErrorAlert = true;
            return of([]);
          })
        )
      }),
    );
  }


}

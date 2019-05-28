import { Component, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-ricerca',
  templateUrl: './ricerca.component.html',
  styleUrls: ['./ricerca.component.css']
})
export class RicercaComponent implements OnInit {

  searchValue: string;
  searchedValue: string;
  books: Book[];
  totalBooks: number;
  totalPages: number;
  pageSize: number;
  page: any;
  previousPage: any;
  isEmpty: boolean;
  hideResults: boolean;
  showErrorAlert: boolean;

  constructor(private booksService: BooksService) {}

  ngOnInit() {
    this.hideResults=true;
    this.showErrorAlert = false;
  }

  search(){
    console.log(this.searchValue);
    this.searchedValue = this.searchValue;
    this.page = 1;
    this.previousPage = this.page;
    this.pageSize=10;
    this.showErrorAlert = false;
    this.load();
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.load();
    }
  }

  load(){
    this.booksService.search(this.searchedValue, this.previousPage-1, this.pageSize).subscribe(
      booksPage => {
        console.log(booksPage);
        this.hideResults = false;
        this.books = booksPage.content;
        this.totalBooks = booksPage.totalElements;
        this.totalPages = booksPage.totalPages;
      },
      error => {
        console.log(error);
        this.showErrorAlert = true;
      }
    );
  }


}

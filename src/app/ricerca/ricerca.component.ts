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
  searchAuthor: string;
  searchTitle: string;
  searchPublisher: string;
  searchCategory: string;
  books: Book[];
  totalBooks: number;
  totalPages: number;
  pageSize: number;
  page: any;
  previousPage: any;
  isEmpty: boolean;
  hideResults: boolean;
  showErrorAlert: boolean;
  isAdvancedOpen: boolean;

  constructor(private booksService: BooksService) {}

  ngOnInit() {
    this.isAdvancedOpen=false
    this.hideResults=true;
    this.showErrorAlert = false;
    this.searchedValue="";
  }


  advancedSearch(){
    if(this.searchValue){this.searchedValue=""}
    if(this.searchAuthor){ this.searchedValue+=" authors:"+this.searchAuthor;}
    if(this.searchTitle){ this.searchedValue+=" title:"+this.searchTitle;}
    if(this.searchPublisher){ this.searchedValue+=" publisher:"+this.searchPublisher;}
    if(this.searchCategory){ this.searchedValue+=" category:"+this.searchCategory;} 
    this.searchedValue = this.searchedValue.trim();
    this.searchValue = this.searchedValue;
    this.isAdvancedOpen = false;
    this.page = 1;
    this.previousPage = this.page;
    this.pageSize=10;
    this.showErrorAlert = false;
    this.load();
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
    console.log(this.searchedValue);
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

import { Component, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';
import { Book, Genre } from '../models/book.model';
import { GenreService } from '../services/genre.service';

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
  showHeavyChartAlert: boolean;
  isAdvancedOpen: boolean;
  genres: Genre[];
  isMobile: boolean;
  chart: Book[] = [];

  constructor(private booksService: BooksService, private genreService: GenreService) {}

  ngOnInit() {
    this.isAdvancedOpen=false
    this.hideResults=true;
    this.showErrorAlert = false;
    this.showHeavyChartAlert = false;
    this.searchedValue="";
    this.genreService.getGenres().subscribe(
      res => {
        console.log(res);
        this.genres = res;
      },
      error => {
        console.log(error);
      }
    );
    if (window.innerWidth <=480) { 
      this.isMobile = true;
    }
  }

  ngAfterViewInit(){
    // Send message to the top window (parent) at 500ms interval
    setInterval(function() {
      window.top.postMessage(document.body.scrollHeight, "*");
    }, 500); 
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

  addToChart(book: Book){
    this.chart.push(book);
    console.log(this.chart);
    console.log(this.chart[0]);  
  }

  removeFromChart(book: Book){
    const index: number = this.chart.indexOf(book);
    if (index !== -1) {
        this.chart.splice(index, 1);
    }
    console.log(this.chart); 
  }

  toBookingPage(){
    if(this.chart.length>5){
      this.showHeavyChartAlert = true;
    }else if(this.chart.length>0){
      this.showHeavyChartAlert = false;
      let param = "";
      this.chart.forEach(function(elem){
        param += elem.title+' '+elem.isbn+'; '
      });
      window.open("https://equilibreria.weebly.com/prenota-un-libro.html?input="+param, "_blank");
    }
  }


}

import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book.model';
import { BooksService } from '../services/books.service';
import { ExcelService } from '../services/excel.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})


export class CatalogoComponent implements OnInit {

  itemsPerPage: number;
  insBooks: Book[];
  delBooks: Book[];
  totalInsBooks: number;
  totalInsPages: number;
  insBookPage: any;
  previousInsBooksPage: any;
  totalDelBooks:number;
  totalDelPages:number;
  delBookPage: any;
  previousDelBooksPage: any;
  allBooks: Book[];
  isDownloadingExcel: boolean;

  constructor(private booksService: BooksService, private excelService: ExcelService) { 
    this.itemsPerPage = 10;
    this.insBooks = [];
    this.delBooks = [];
    this.insBookPage = 1;
    this.delBookPage = 1;
    this.previousDelBooksPage = 1;
    this.previousInsBooksPage = 1;
    this.loadLastsInserted();
    this.loadLastDeleted();
    this.isDownloadingExcel = false;
  }

  

  ngOnInit() {}

  loadInsBooksPage(page: number) {
    if (page !== this.previousInsBooksPage) {
      this.previousInsBooksPage = page;
      this.loadLastsInserted();
    }
  }

  loadDelBooksPage(page: number) {
    if (page !== this.previousDelBooksPage) {
      this.previousDelBooksPage = page;
      this.loadLastDeleted();
    }
  }

  loadLastsInserted() {
    this.booksService.lastsInserted(this.previousInsBooksPage-1,this.itemsPerPage).subscribe(
      booksPage => {
        console.log(booksPage);
        this.insBooks = booksPage.content;
        this.totalInsBooks = booksPage.totalElements;
        this.totalInsPages = booksPage.totalPages;
      },
      error => {
        console.log(error);
      }
    );  
  }

  loadLastDeleted() {
    this.booksService.lastsDeleted(this.previousDelBooksPage-1,this.itemsPerPage).subscribe(
      booksPage => {
        console.log(booksPage);
        this.delBooks = booksPage.content;
        this.totalDelBooks = booksPage.totalElements;
        this.totalDelPages = booksPage.totalPages;
      },
      error => {
        console.log(error);
      }
    );
  }

  exportAllAsXLSX(){
    this.isDownloadingExcel = true;
    this.booksService.getAll().subscribe(
      booksPage => {
        console.log(booksPage);
        this.allBooks = booksPage.content;
        this.allBooks.forEach(function(el, index) {
          let nc = null;
          let rd = null;
          let p = null;
          if(el.libraryMetadata!=null){
            nc = el.libraryMetadata.numberOfCopy;
            if(el.libraryMetadata.registrationDates!=null && el.libraryMetadata.registrationDates.length>0){
              rd = new Date(el.libraryMetadata.registrationDates[el.libraryMetadata.registrationDates.length-1]);
            }
            if(el.libraryMetadata.positions!=null && el.libraryMetadata.positions.length>0){
              p = el.libraryMetadata.positions.join(); 
            } 
          }
          this[index] = {'Titolo':el.title,
                        'Autore':el.authors,
                        'Editore':el.publisher,
                        'Categoria':el.category,
                        'Isbn':el.isbn,
                        'Data Ultima Registrazione':rd,
                        'Numero di Copie':nc,
                        'Posizioni':p
                      };
        }, this.allBooks);
        this.excelService.exportAsExcelFile(this.allBooks);
        this.isDownloadingExcel = false;
      },
      error => {
        console.log(error);
        this.isDownloadingExcel = false;
      }
    );
  }

}

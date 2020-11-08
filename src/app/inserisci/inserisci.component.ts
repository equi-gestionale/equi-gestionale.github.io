import { Component, OnInit } from '@angular/core';
import {GoogleBookService} from '../services/google-book.service';
import { Book } from '../models/book.model';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-inserisci',
  templateUrl: './inserisci.component.html',
  styleUrls: ['./inserisci.component.css']
})
export class InserisciComponent implements OnInit {

  showManualInsert: boolean;
  showBarcodeReader: boolean;
  showBookDetail: boolean;
  selectNotEmpty: boolean;
  searchValue = '';
  barcode = '';
  book: Book;
  editBookMode : boolean;
  showFoundInLibrary: boolean;
  

  constructor(private googleApi: GoogleBookService, private booksService: BooksService,) { 
    this.showBarcodeReader = false;
    this.showBookDetail = false;
    this.showManualInsert = false;
  }

  ngOnInit() {
    if (window.history.state.book) {
      this.barcode = '';
      this.showBarcodeReader = false;
      this.showManualInsert = false;
      this.showBookDetail = true;
      this.book = window.history.state.book;
      this.editBookMode = true;
      console.log(this.book);
    } else {
      this.barcode = '';
      this.showBarcodeReader = false;
      this.showBookDetail = false;
      this.showManualInsert = false;
      this.editBookMode = false;
      this.showFoundInLibrary = false;
    }
  }

  onDetected(bcode: string){
    this.searchValue = bcode;
    this.searchIsbn();
  }
  
  manualInsert(){
    this.showManualInsert = true;
    this.showBarcodeReader = false;
  }

  searchIsbn(){
    this.searchValue = this.searchValue.replace('-', '').trim();
    console.log(this.searchValue);
    this.barcode = this.searchValue;
    this.booksService.search(this.barcode,0,1).subscribe(
      booksPage => {
        console.log(booksPage);
        if(booksPage.totalElements>0){
          this.setBookInComponent(booksPage.content[0]);
          this.showFoundInLibrary = true;
        }else{
          this.googleApi.searchIsbn(this.barcode).subscribe(
            book => {
              this.setBookInComponent(book);
            }
          );
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  private setBookInComponent(book: Book){
    this.book = book;
    console.log(this.book);
    this.showBookDetail = true;
    this.showManualInsert = false;
    this.showBarcodeReader = false;
  }

  back(){
    this.showBookDetail = false;
    this.showManualInsert = false;
    this.showBarcodeReader = false;
    this.showFoundInLibrary = false;
  }


}

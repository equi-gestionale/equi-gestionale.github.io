import { Component, OnInit } from '@angular/core';
import {GoogleBookService} from '../services/google-book.service';
import { Book } from '../models/book.model';

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
  

  constructor(private googleApi: GoogleBookService) { 
    this.showBarcodeReader = true;
    this.showBookDetail = false;
    this.showManualInsert = false;
  }

  ngOnInit() {
    this.barcode = '';
    this.showBarcodeReader = true;
    this.showBookDetail = false;
    this.showManualInsert = false;
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
    this.googleApi.searchIsbn(this.barcode).subscribe(
      book => {
        this.book = book;
        console.log(this.book);
        this.showBookDetail = true;
        this.showManualInsert = false;
        this.showBarcodeReader = false;
      }
    );
  }

  back(){
    this.showBookDetail = false;
    this.showManualInsert = false;
    this.showBarcodeReader = true;
  }


}

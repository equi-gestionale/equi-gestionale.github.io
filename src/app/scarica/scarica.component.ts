import { Component, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-scarica',
  templateUrl: './scarica.component.html',
  styleUrls: ['./scarica.component.css']
})
export class ScaricaComponent implements OnInit {

  showManualInsert: boolean;
  showBarcodeReader: boolean;
  showBookDetail: boolean;
  searchValue = '';
  barcode = '';
  book: Book;
  

  constructor(private booksService: BooksService) { 
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
    console.log(this.searchValue);
    this.barcode = this.searchValue;
    this.booksService.searchIsbn(this.barcode).subscribe(
      booksPage => {
          if(booksPage.content.length>0){
          this.book = booksPage.content[0];
          console.log(this.book);
          if(this.book.isbn==''){
            this.book.isbn = this.barcode;
          }
          this.showBookDetail = true;
          this.showManualInsert = false;
          this.showBarcodeReader = false;
        }
      }
    );
  }

  back(){
    this.showBookDetail = false;
    this.showManualInsert = false;
    this.showBarcodeReader = true;
  }


}

import { Component, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';
import { Book } from '../models/book.model';
import { Member, TakenBook } from '../models/member.model';

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
  selectedMember:Member;
  editBookMode: boolean;
  

  constructor(private booksService: BooksService) { 
    this.showBarcodeReader = true;
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
      this.showBarcodeReader = true;
      this.showBookDetail = false;
      this.showManualInsert = false;
      this.editBookMode = false;
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

  manageSelectedMember(member){
    this.selectedMember = member;
    if(this.book!=null){
      let takenBook = new TakenBook();
      takenBook.id = this.book.id;
      takenBook.authors = this.book.authors;
      takenBook.isbn = this.book.isbn;
      takenBook.publisher = this.book.publisher;
      takenBook.title = this.book.title;
      takenBook.takenDate = new Date();
    }
  }

}

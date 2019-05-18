import { Component, OnInit, Input } from '@angular/core';
import { BooksService } from '../services/books.service';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-insert-buttons',
  templateUrl: './insert-buttons.component.html',
  styleUrls: ['./insert-buttons.component.css']
})
export class InsertButtonsComponent implements OnInit {

  @Input() book: Book;
  @Input() type: string;
  @Input() showAlerts: boolean;
  private showSuccessAlert = false;
  private showErrorAlert = false;
  showSaveButton = false;
  showDiscardButton = false;

  constructor(private booksService: BooksService) {}

  ngOnInit() {
    this.showSuccessAlert = false;
    this.showErrorAlert = false;
    console.log(this.type+" on init type")
    if(this.type=="insert"){
      this.showSaveButton = true;
    }else if(this.type=="discard"){
      this.showDiscardButton = true;
    }
    this.showAlerts = false;
    console.log(this.showSaveButton+" on init show save button")
  }


  save(){
    this.showAlerts = false;
    console.log(this.book);
    this.booksService.insertBook(this.book).subscribe(
      book => {
        console.log(this.book);
        this.showAlerts = true;
        this.showSuccessAlert = true;
        this.book = book;
      },
      error => {
        console.log(error);
        this.showAlerts = true;
        this.showErrorAlert = true;
      }
    );
  }

  discard(){
    this.showAlerts = false;
    console.log(this.book);
    this.booksService.deleteIsbn(this.book.id).subscribe(
      book => {
        console.log(this.book);
        this.showAlerts = true;
        this.showSuccessAlert = true;
        this.book = book;
      },
      error => {
        console.log(error);
        this.showAlerts = true;
        this.showErrorAlert = true;
      }
    );
  }

}

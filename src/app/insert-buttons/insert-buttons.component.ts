import { Component, OnInit, Input } from '@angular/core';
import { BooksService } from '../services/books.service';
import { Book } from '../models/book.model';
import { error } from 'util';

@Component({
  selector: 'app-insert-buttons',
  templateUrl: './insert-buttons.component.html',
  styleUrls: ['./insert-buttons.component.css']
})
export class InsertButtonsComponent implements OnInit {

  @Input() book: Book;
  private showSuccessAlert: boolean;
  private showErrorAlert: boolean;

  constructor(private booksService: BooksService) { 
    this.showSuccessAlert = false;
    this.showErrorAlert = false;
  }

  ngOnInit() {
    this.showSuccessAlert = false;
    this.showErrorAlert = false;
  }


  save(){
    console.log(this.book);
    this.booksService.insertBook(this.book).subscribe(
      book => {
        console.log(this.book);
        this.showSuccessAlert = true;
        this.book = book;
      },
      error => {
        console.log(error);
        this.showErrorAlert = true;
      }
    );
  }

}

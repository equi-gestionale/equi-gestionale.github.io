import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book.model';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-public-library',
  templateUrl: './public-library.component.html',
  styleUrls: ['./public-library.component.css']
})
export class PublicLibraryComponent implements OnInit {

  books: Book[];

  constructor(private booksService: BooksService) { }

  ngOnInit() {
    this.books = [];
    this.loadPublicLibrary();
  }

  loadPublicLibrary() {
    this.booksService.publicLibrary().subscribe(
      booksPage => {
        console.log(booksPage);
        this.books = booksPage.content;
      },
      error => {
        console.log(error);
      }
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book.model';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  insBooks: Book[];
  delBooks: Book[];

  constructor(private booksService: BooksService) { 
    this.insBooks = [];
    this.delBooks = [];
  }

  ngOnInit() {
    this.booksService.lastsInserted().subscribe(
      books => {
          if(books.length>0){
          this.insBooks = books;
          console.log(this.insBooks);
        }
      }
    );  
    this.booksService.lastsDeleted().subscribe(
      books => {
          if(books.length>0){
          this.delBooks = books;
          console.log(this.delBooks);
        }
      }
    );    
  }

}

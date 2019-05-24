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
    this.booksService.lastsInserted(0,10).subscribe(
      booksPage => {
          if(booksPage.content.length>0){
          this.insBooks = booksPage.content;
          console.log(this.insBooks);
        }
      }
    );  
    this.booksService.lastsDeleted(0,10).subscribe(
      booksPage => {
          if(booksPage.content.length>0){
          this.delBooks = booksPage.content;
          console.log(this.delBooks);
        }
      }
    );    
  }

}

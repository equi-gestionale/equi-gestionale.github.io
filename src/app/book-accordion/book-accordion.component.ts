import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Book } from '../models/book.model';
import { Router } from "@angular/router";

@Component({
  selector: 'app-book-accordion',
  templateUrl: './book-accordion.component.html',
  styleUrls: ['./book-accordion.component.css']
})
export class BookAccordionComponent implements OnInit {

  isOpen: boolean;
  @Input() book: Book;

  constructor(private _router: Router) { }

  ngOnInit() {
    this.isOpen = false;
  }

  edit(book: Book) {
    this._router.navigateByUrl("/inserisci", {
      state: { book: book }
    });
  }

  delete(book: Book) {
    this._router.navigateByUrl("/scarica", {
      state: { book: book }
    });
  }

}

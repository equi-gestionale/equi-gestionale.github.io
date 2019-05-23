import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-book-accordion',
  templateUrl: './book-accordion.component.html',
  styleUrls: ['./book-accordion.component.css']
})
export class BookAccordionComponent implements OnInit {

  isOpen: boolean;
  @Input() book: Book;

  constructor() { }

  ngOnInit() {
    this.isOpen = false;
  }

}

import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Book } from '../models/book.model';
import { Router } from "@angular/router";
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../user';

@Component({
  selector: 'app-book-accordion',
  templateUrl: './book-accordion.component.html',
  styleUrls: ['./book-accordion.component.css']
})
export class BookAccordionComponent implements OnInit {

  isOpen: boolean;
  @Input() isInChart: boolean;
  @Input() book: Book;
  @Output() addToChart:EventEmitter<Book> = new EventEmitter();
  @Output() removeFromChart:EventEmitter<Book> = new EventEmitter();
  isMobile: boolean;
  currentUser: User;
 
  constructor(private _router: Router, private authenticationService: AuthenticationService) { 
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.isOpen = false;
    if (window.innerWidth <=480) { 
      this.isMobile = true;
    }
  }

  clickCardHeader(event){
    if(event.srcElement.tagName!="path" && event.srcElement.tagName!="i" &&
        event.srcElement.tagName!="BUTTON" && event.srcElement.tagName!="svg" &&
        event.srcElement.id!="aaa" && event.srcElement.id!="bbb"){
      this.isOpen = !this.isOpen
    }
    console.log(event);
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

  prenota(){
    let param = this.book.title+' '+this.book.isbn
    
  }

  addedToChart(){
    this.addToChart.emit(this.book);
    this.isInChart = true;
  }

  removedFromChart(){
    this.removeFromChart.emit(this.book);
    this.isInChart = false;
  }

}

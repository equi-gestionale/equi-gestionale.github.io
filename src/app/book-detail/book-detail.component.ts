import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Book, Genre, LibraryMetadata } from '../models/book.model';
import { GenreService } from '../services/genre.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  @Input() book: Book;
  @Input() readonly: boolean;
  @Input() editMode: boolean;
  genres: Genre[];
  @Output() selectEvent:EventEmitter<boolean> = new EventEmitter();
  tmpThumbnail;

  constructor(private genreService: GenreService) { 
  }

  ngOnInit() {
    this.genreService.getGenres().subscribe(
      res => {
        console.log(res);
        this.genres = res;
      },
      error => {
        console.log(error);
      }
    );
    if(this.book && this.book.category){
      this.selectEvent.emit(true);
    }else{
      this.selectEvent.emit(false);
    }
    this.tmpThumbnail=null;
    if(!this.book.libraryMetadata){
      this.book.libraryMetadata = new LibraryMetadata();
    }
    this.book.libraryMetadata.editMode=this.editMode;
    if(this.editMode){
      this.initPositions();
    }
  }

  initPositions(){
    let numberOfCopy = this.book.libraryMetadata.numberOfCopy;
    let numberOfPositions = 0
    if(this.book.libraryMetadata.positions){
      numberOfPositions = this.book.libraryMetadata.positions.length;
    }else{
      this.book.libraryMetadata.positions = [];
    }
    for (let i = 0; i < numberOfCopy - numberOfPositions; i++) {
      this.book.libraryMetadata.positions.push("");
    }
  }

  changeSelect(){
    if(this.book.category){
      this.selectEvent.emit(true);
      console.log('changeSelect true');
    }
    else{
      this.selectEvent.emit(false);
      console.log('changeSelect false');
    }
  }

  removeThumbnail(){
    if(this.tmpThumbnail==null && this.book.thumbnail!=null ){
      this.tmpThumbnail=this.book.thumbnail;
      this.book.thumbnail=null;
    }else if(this.tmpThumbnail!=null && this.book.thumbnail==null){
      this.book.thumbnail=this.tmpThumbnail;
      this.tmpThumbnail=null;
    }
  }

  trackByFn(index: any, item: any) {
    return index;
 }

}

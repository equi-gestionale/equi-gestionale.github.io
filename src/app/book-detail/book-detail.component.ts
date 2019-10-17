import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Book, Genre } from '../models/book.model';
import { GenreService } from '../services/genre.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  @Input() book: Book;
  @Input() readonly: boolean;
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
    this.selectEvent.emit(false);
    this.tmpThumbnail=null;
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


}

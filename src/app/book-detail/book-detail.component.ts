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
    )
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


}

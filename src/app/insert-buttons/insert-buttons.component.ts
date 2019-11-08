import { Component, OnInit, Input } from '@angular/core';
import { BooksService } from '../services/books.service';
import { Book } from '../models/book.model';
import { Member, TakenBook } from '../models/member.model';
import { MembersService } from '../services/members.service';

@Component({
  selector: 'app-insert-buttons',
  templateUrl: './insert-buttons.component.html',
  styleUrls: ['./insert-buttons.component.css']
})
export class InsertButtonsComponent implements OnInit {

  @Input() book: Book;
  @Input() type: string;
  @Input() showAlerts: boolean;
  @Input() selectNotEmpty: boolean;
  @Input() selectedMember: Member;
  private showSuccessAlert = false;
  private showErrorAlert = false;
  private showValidationErrorAlert = false;
  showSaveButton = false;
  showDiscardButton = false;
  

  constructor(private booksService: BooksService, private membersService: MembersService) {}

  ngOnInit() {
    this.showSuccessAlert = false;
    this.showErrorAlert = false;
    this.showValidationErrorAlert = false;
    console.log(this.type+" on init type")
    if(this.type=="insert"){
      this.showSaveButton = true;
    }else if(this.type=="discard"){
      this.showDiscardButton = true;
    }
    this.showAlerts = false;
    console.log(this.showSaveButton+" on init show save button");
  }


  save(){
    this.showAlerts = false;
    console.log(this.book);
    if(this.validateBook(this.book)==true){
      this.booksService.insertBook(this.book).subscribe(
        book => {
          console.log(this.book);

          this.showAlerts = true;
          this.showSuccessAlert = true;
          this.showErrorAlert = false;
          this.showValidationErrorAlert = false;
          this.book = book;
        },
        error => {
          console.log(error);
          this.showAlerts = true;
          this.showErrorAlert = true;
          this.showValidationErrorAlert = false;
        }
      );
    }else{
      this.showAlerts = true;
      this.showSuccessAlert = false;
      this.showErrorAlert = false;
      this.showValidationErrorAlert = true;
    }
  }

  discard(){
    this.showAlerts = false;
    console.log(this.book);
    console.log(this.selectedMember);
    this.booksService.deleteIsbn(this.book.id).subscribe(
      book => {
        console.log(this.book);
        this.book = book;
        if(this.selectedMember!=null){
          this.addTakenBook();
          this.membersService.updateMember(this.selectedMember).subscribe(
            member =>{
              console.log(member);
              this.showAlerts = true;
              this.showSuccessAlert = true;
              this.selectedMember=member;
            }
          );
        }
        
      },
      error => {
        console.log(error);
        this.showAlerts = true;
        this.showErrorAlert = true;
      }
    );
  }
  private addTakenBook(){
    let takenBook = new TakenBook();
    takenBook.id = this.book.id;
    takenBook.authors = this.book.authors;
    takenBook.isbn = this.book.isbn;
    takenBook.publisher = this.book.publisher;
    takenBook.title = this.book.title;
    takenBook.takenDate = new Date();
    if(this.selectedMember.takenBooks==null){
      this.selectedMember.takenBooks = new Array();
    }
    this.selectedMember.takenBooks.push(takenBook);
  }


  private validateBook(book: Book): boolean{
    if(!book.title || !book.authors || !book.category)
      return false;
    return true;
  }

}

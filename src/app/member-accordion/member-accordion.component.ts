import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Member } from '../models/member.model';
import { Router } from "@angular/router";


@Component({
  selector: 'app-member-accordion',
  templateUrl: './member-accordion.component.html',
  styleUrls: ['./member-accordion.component.css']
})
export class MemberAccordionComponent implements OnInit {

  isOpen: boolean;
  @Input() member: Member;
  @Input() editMode: boolean;
  @Output() selectEvent:EventEmitter<Member> = new EventEmitter();

  constructor(private _router: Router) { }

  ngOnInit() {
    this.isOpen = false;
  }

  select(member:Member){
    this.selectEvent.emit(member);
    console.log('selected member in member-accordion-component:'+ member.id);
  }

  edit(member: Member) {
    this._router.navigateByUrl("/inserisci-associato", {
      state: { member: member }
    });
  }
  
  headerClick(){
    if(this.editMode){
      this.isOpen = !this.isOpen;
    }
  }
  
}

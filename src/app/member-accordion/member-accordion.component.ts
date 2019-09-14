import { Component, OnInit, Input } from '@angular/core';
import { Member } from '../models/member.model';

@Component({
  selector: 'app-member-accordion',
  templateUrl: './member-accordion.component.html',
  styleUrls: ['./member-accordion.component.css']
})
export class MemberAccordionComponent implements OnInit {

  isOpen: boolean;
  @Input() member: Member;

  constructor() { }

  ngOnInit() {
    this.isOpen = false;
  }
  
}

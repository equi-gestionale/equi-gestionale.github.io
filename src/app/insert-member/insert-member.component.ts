import { Component, OnInit } from '@angular/core';
import { Member, Address, Contacts, AddInfo, Membership } from '../models/member.model';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { MembersService } from '../services/members.service';

@Component({
  selector: 'app-insert-member',
  templateUrl: './insert-member.component.html',
  styleUrls: ['./insert-member.component.css']
})
export class InsertMemberComponent implements OnInit {

  member: Member;
  private showSuccessAlert = false;
  private showErrorAlert = false;
  private showAlerts: boolean;

  constructor(private calendar: NgbCalendar, private membersService: MembersService) {}

  ngOnInit() {
    let address = new Address;
    let contacts = new Contacts;
    let addInfo = new AddInfo;
    this.member = new Member;
    let membership = new Membership;
    this.member.address = address;
    this.member.contacts = contacts;
    this.member.addInfo = addInfo;
    this.member.membership = membership;
    let today = this.calendar.getToday()
    this.member.membership.date = new Date(today.year, today.month - 1, today.day);

    this.showSuccessAlert = false;
    this.showErrorAlert = false;
    this.showAlerts = false;
  }

  save(){
    this.showAlerts = false;
    console.log(this.member);
    this.membersService.insertMember(this.member).subscribe(
      member => {
        console.log(this.member);
        this.showAlerts = true;
        this.showSuccessAlert = true;
        this.member = member;
      },
      error => {
        console.log(error);
        this.showAlerts = true;
        this.showErrorAlert = true;
      }
    );
  }

}

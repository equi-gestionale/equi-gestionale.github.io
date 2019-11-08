import { Component, OnInit } from '@angular/core';
import { Member, Address, Contacts, AddInfo, Membership, Benefit } from '../models/member.model';
import { NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { MembersService } from '../services/members.service';
import { FormGroup, FormControl } from '@angular/forms';
import { customMemberValidator } from '../member.directive';
import { NgbDateCustomParserFormatter } from '../dateCustoFormatter';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-insert-member',
  templateUrl: './insert-member.component.html',
  styleUrls: ['./insert-member.component.css'],
  providers: [
    {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}
   ]
})
export class InsertMemberComponent implements OnInit {

  member: Member;
  showSuccessAlert = false;
  showErrorAlert = false;
  showAlerts: boolean;
  showSaveButton = true;
  editUserMode = false;
  benefits = ['','un libro','due libri','tre libri'];

  constructor(
    private calendar: NgbCalendar, 
    private membersService: MembersService,
    public activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    if (window.history.state.member) {
      this.member = window.history.state.member;
      this.member.birthdate = new Date(window.history.state.member.birthdate);
      this.member.membership.registrationDate = new Date(window.history.state.member.membership.registrationDate );
      this.editUserMode = true;
      console.log(this.member);
    } else {
      this.editUserMode = false;
      let address = new Address;
      let contacts = new Contacts;
      let addInfo = new AddInfo;
      this.member = new Member;
      let membership = new Membership;
      let benefit = new Benefit;
      this.member.address = address;
      this.member.contacts = contacts;
      this.member.addInfo = addInfo;
      this.member.membership = membership;
      let today = this.calendar.getToday()
      this.member.membership.registrationDate = new Date(today.year, today.month - 1, today.day);
      this.member.benefit = benefit;
      this.member.benefit.benefitUsed = false;
    }
    
    this.showSuccessAlert = false;
    this.showErrorAlert = false;
    this.showAlerts = false;
    this.showSaveButton = true;

    const memberForm = new FormGroup({
      'name': new FormControl(),'surname': new FormControl(),'birthdate': new FormControl(),
      'birthplace': new FormControl(),'city': new FormControl(),'state': new FormControl(),
      'street': new FormControl(),'cap': new FormControl(),'cell': new FormControl(),
      'phone': new FormControl(),'email': new FormControl(),'qualification': new FormControl(),
      'profession': new FormControl(),'hobby': new FormControl(),'website': new FormControl(),
      'note': new FormControl(),'standard': new FormControl(), 'schoolclass': new FormControl(),
      'amount': new FormControl(),'className': new FormControl(),'privacy': new FormControl(),
      'newsletterEnabled': new FormControl(),'date': new FormControl()},{ validators: customMemberValidator });
  }

  save(){
    this.showAlerts = false;
    if(!this.member.membership.standard){
      this.member.membership.memberColor=null;
    }
    console.log(this.member);
    this.membersService.insertMember(this.member).subscribe(
      member => {
        console.log(this.member);
        this.showAlerts = true;
        this.showSuccessAlert = true;
        this.showErrorAlert = false;
        this.showSaveButton = false;
        this.member = member;
        this.member.birthdate = new Date(member.birthdate);
        this.member.membership.registrationDate = new Date(member.membership.registrationDate );
      },
      error => {
        console.log(error);
        this.showAlerts = true;
        this.showSuccessAlert = false;
        this.showErrorAlert = true;
      }
    );
  }

  compareBenefitType(first, second){
    return first && second && first == second;
  }

}

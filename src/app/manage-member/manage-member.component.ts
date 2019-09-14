import { Component, OnInit } from '@angular/core';
import { MembersService } from '../services/members.service';
import { Member } from '../models/member.model';

@Component({
  selector: 'app-manage-member',
  templateUrl: './manage-member.component.html',
  styleUrls: ['./manage-member.component.css']
})
export class ManageMemberComponent implements OnInit {

  searchedValue: string;
  showMemberDetail: boolean;
  showErrorAlert: boolean;
  members: Member[];
  page;
  previousPage;
  pageSize;
  totalMembers;
  totalPages;
  hideResults;

  constructor(private membersService: MembersService) { }

  ngOnInit() {
    this.showMemberDetail = false;
    this.hideResults=true;
    this.showErrorAlert = false;
    this.searchedValue="";
  }

  search(){
    console.log(this.searchedValue);
    this.searchedValue = this.searchedValue;
    this.page = 1;
    this.previousPage = this.page;
    this.pageSize=10;
    this.showErrorAlert = false;
    this.load();
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.load();
    }
  }

  load(){
    console.log(this.searchedValue);
    this.membersService.search(this.searchedValue, this.previousPage-1, this.pageSize).subscribe(
      membersPage => {
        console.log(membersPage);
        this.hideResults = false;
        this.members = membersPage.content;
        this.totalMembers = membersPage.totalElements;
        this.totalPages = membersPage.totalPages;
      },
      error => {
        console.log(error);
        this.showErrorAlert = true;
      }
    );
  }

}

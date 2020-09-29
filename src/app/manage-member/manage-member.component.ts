import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MembersService } from '../services/members.service';
import { ExcelService } from '../services/excel.service';
import { Member, MembersPage } from '../models/member.model';

@Component({
  selector: 'app-manage-member',
  templateUrl: './manage-member.component.html',
  styleUrls: ['./manage-member.component.css']
})
export class ManageMemberComponent implements OnInit {

  @Input() editMode: boolean;
  @Output() selectedMember:EventEmitter<Member> = new EventEmitter();
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
  allMembers : Member[];
  isDownloadingExcel: boolean;

  constructor(private membersService: MembersService, private excelService: ExcelService) { }

  ngOnInit() {
    if(this.editMode==null) this.editMode=true;
    this.showMemberDetail = false;
    this.hideResults=true;
    this.showErrorAlert = false;
    this.searchedValue="";
    this.isDownloadingExcel=false;
    console.log('sono nella onInit di ManageMemberComponent. EditMode:'+this.editMode);
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

  selectMember(member){
    this.selectedMember.emit(member);
    console.log('selected member in manage-member-component:'+ member.id);
  }

  exportAllAsXLSX(){
    this.isDownloadingExcel = true;
    this.membersService.getAllMembers().subscribe(
      membersPage => {
        console.log(membersPage);
        this.allMembers = membersPage.content;
        this.allMembers.forEach(function(el, index) {
          let me = '';
          if(el.contacts!=null && el.contacts.email!=null){
            me = el.contacts.email;
          }
          this[index] = {'Cognome':el.name,
                        'Nome':el.surname,
                        'Email':me
                      };
        }, this.allMembers);
        this.excelService.exportAsExcelFileWithName(this.allMembers,'AssociatiEquilibristi');
        this.isDownloadingExcel = false;
      },
      error => {
        console.log(error);
        this.isDownloadingExcel = false;
      }
    );
  }

}

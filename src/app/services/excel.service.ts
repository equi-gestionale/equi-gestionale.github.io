import { Injectable } from '@angular/core';
import { formatDate } from "@angular/common";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
const EXCEL_FILENAME = 'Equilibristi';
const format = 'ddMMyyyy_HHmmss';
const locale = 'en-US';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  public exportAsExcelFile(json: any[]): void {
    console.log('exportAsExcelFile - IN');
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, EXCEL_FILENAME);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
     console.log('saveAsExcelFile - IN');
     const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
     FileSaver.saveAs(data, fileName + '_export_' + formatDate(new  Date().getTime(),format,locale) + EXCEL_EXTENSION);
  }

}

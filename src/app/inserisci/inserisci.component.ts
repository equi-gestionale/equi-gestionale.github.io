import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import Quagga from 'quagga';
import {GoogleBookService} from '../services/google-book.service';
import { Book } from '../models/book.model';


@Component({
  selector: 'app-inserisci',
  templateUrl: './inserisci.component.html',
  styleUrls: ['./inserisci.component.css']
})
export class InserisciComponent implements OnInit {

  isManualInsert: boolean;
  searchValue = '';
  barcode = '';
  book: Book;
  configQuagga = {
    inputStream: {
      name: 'Live',
      type: 'LiveStream',
      target: '#interactive',
      constraints: {
        width: { min: 640 },
        height: { min: 480 },
        aspectRatio: { min: 1, max: 100 },
        facingMode: 'environment', // or user
      },
      singleChannel: false // true: only the red color-channel is read
    },
    locator: {
      patchSize: 'medium',
      halfSample: true,
      debug: {
        showCanvas: true,
        showPatches: true,
        showFoundPatches: true,
        showSkeleton: true,
        showLabels: true,
        showPatchLabels: true,
        showRemainingPatchLabels: true,
        boxFromPatches: {
          showTransformed: true,
          showTransformedBox: true,
          showBB: true
        }
      }
    },
    locate: true,
    numOfWorkers: 4,
    decoder: {
      readers: [
        'code_128_reader', 'ean_reader', 'ean_8_reader', 'EAN'
      ],
      debug: {
        drawBoundingBox: true,
        showFrequency: true,
        drawScanline: true,
        showPattern: true
      },
      multiple: false
    }
  };

  constructor(private ref: ChangeDetectorRef, private googleApi: GoogleBookService) { }

  ngOnInit() {
    this.barcode = '';
    this.ref.detectChanges();
    this.isManualInsert = false;

    Quagga.onProcessed((result) => this.onProcessed(result));

    Quagga.onDetected((result) => this.logCode(result));

    Quagga.init(this.configQuagga, (err) => {
      if (err) {
        return console.log(err);
      }
      Quagga.start();
      console.log('Barcode: initialization finished. Ready to start');
    });
  }

  private onProcessed(result: any) {
    const drawingCtx = Quagga.canvas.ctx.overlay;
    const drawingCanvas = Quagga.canvas.dom.overlay;

     if (result) {
      if (result.boxes) {
        drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute('width'), 10), parseInt(drawingCanvas.getAttribute('height'), 10));
        result.boxes.filter(function (box) {
          return box !== result.box;
        }).forEach(function (box) {
          Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: 'green', lineWidth: 2 });
        });
      }

      if (result.box) {
        Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: '#00F', lineWidth: 2 });
      }

      if (result.codeResult && result.codeResult.code) {
        Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
      }
    } 
  }

  private logCode(result) {
    const code = result.codeResult.code;
    if (this.barcode !== code) {
      this.barcode = 'Barcode letto : ' + code;
      this.ref.detectChanges();
      console.log('Barcode letto : ' + this.barcode);
      Quagga.stop();
    }
  }

  private manualInsert(){
    this.isManualInsert = true;
    Quagga.stop();
  }

  private searchIsbn(){
    console.log(this.searchValue);
    this.barcode = this.searchValue;
    this.googleApi.search_isbn(this.barcode).subscribe(book => this.book = book);
    console.log(this.book);
  }


}

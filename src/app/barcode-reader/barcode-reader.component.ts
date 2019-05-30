import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import Quagga from 'quagga';
import { count } from 'rxjs/operators';

@Component({
  selector: 'app-barcode-reader',
  templateUrl: './barcode-reader.component.html',
  styleUrls: ['./barcode-reader.component.css']
})
export class BarcodeReaderComponent implements OnInit {

  @Output() barcode = new EventEmitter<string>();
  bcode = '';
  last_result: String[];

  configQuagga2 = {
    inputStream : {
      name : "Live",
      type : "LiveStream",
      target: '#barcode-scanner'  
    },
    numOfWorkers: navigator.hardwareConcurrency,
    decoder : {
      readers : ["code_128_reader","ean_reader","ean_8_reader"],
      debug: {
          drawBoundingBox: true,
          showFrequency: true,
          drawScanline: true,
          showPattern: true
      },
      multiple: false
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
    }
  }

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit() {

    this.ref.detectChanges();
    Quagga.onProcessed((result) => this.onProcessed(result));

    Quagga.onDetected((result) => this.logCode(result));
    console.log('Sono nella onInit');
    if(navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function'){
      Quagga.init(this.configQuagga2, (err) => {
        if (err) {
          //return console.log(err);
        }
        Quagga.start();
        console.log('Barcode: initialization finished. Ready to start');
      });
    }
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
    console.log(result.codeResult);
    let last_code = result.codeResult.code;
    this.last_result.push(last_code);
    if(this.last_result.length > 10 ){
      this.bcode = this.order_by_occurrence(this.last_result)[0]; 
      this.barcode.emit(this.bcode);
      this.ref.detectChanges();
      console.log('Barcode letto : ' + this.bcode);
      Quagga.stop();
    }
  }

  private order_by_occurrence(arr){
    var counts = {};
    arr.forEach(function(value){
      if(!counts[value]){
        counts[value] = 0;
      }
      counts[value] ++;
    });
    return Object.keys(counts).sort(function(curKey, nextKey) {
      return (counts[curKey] - counts[nextKey]);
    });
  };

  stop(){
    Quagga.stop();
  }


}

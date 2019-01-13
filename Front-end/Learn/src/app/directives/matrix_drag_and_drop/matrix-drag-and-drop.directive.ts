import { Directive, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
declare let $ : any;
@Directive({
  selector: '[appMatrixDragAndDrop]'
})
export class MatrixDragAndDropDirective implements OnInit{


  @Output() onDrop: EventEmitter<any> = new EventEmitter();

  constructor(private eleRef: ElementRef) {

  }
  ngOnInit() {
    const self=this;
    var element =$(self.eleRef.nativeElement);
      element.draggable({
      revert: 'invalid',
      stop: function(){
        $(this).draggable('option','revert','invalid');
    }
    });



  }

}

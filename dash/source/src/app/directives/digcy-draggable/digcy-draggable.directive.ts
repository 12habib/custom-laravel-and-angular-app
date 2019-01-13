import { Directive, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';

declare let $ : any;

@Directive({
  selector: '[appDigcyDraggable]'
})
export class DigcyDraggableDirective implements OnInit {
  
  @Output() onUpdate = new EventEmitter();

  constructor(private eleRef: ElementRef) { 
    
  }

  ngOnInit() {
    const self = this;
    var sortable = $(this.eleRef.nativeElement);
    sortable.sortable({
      update: function(event, ui) {
        var data = sortable.sortable('toArray');
        self.onUpdate.emit(data);
        
      }
    });
  }

}

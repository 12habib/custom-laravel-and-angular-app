import { Directive, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';

declare let $ : any;

@Directive({
  selector: '[appDigcySortable]'
})
export class DigcySortableDirective implements OnInit {

  @Output() onFinished: EventEmitter<any> = new EventEmitter();

  constructor(private eleRef: ElementRef) {

  }

  ngOnInit() {
    const self = this;
    var ele = $(this.eleRef.nativeElement);
    ele.sortable({
      update: function( e,ui) {
        var previndex = ele.sortable('instance').currentItem[0].id;

        var data= ele.sortable('instance').currentItem[0].innerText;
        var newindex=ui.item.index();
        var arr=ele.sortable('toArray');
        var dataObj={
          'index':previndex,
          'text':data,
          'new_index':newindex,

          'array':arr,
        }
        self.onFinished.emit(dataObj);
      }
    });


  }

}

import {
  Directive,
  Output,
  EventEmitter,
  OnInit,
  ElementRef
} from "@angular/core";
declare let $: any;
@Directive({
  selector: "[appMatrixDroppable]"
})
export class MatrixDroppableDirective implements OnInit {
  @Output() onDrop: EventEmitter<any> = new EventEmitter();

  constructor(private eleRef: ElementRef) {}
  ngOnInit() {
    const self = this;
    let element = $(self.eleRef.nativeElement);

    element.droppable({
      drop: function(event, ui) {
        let text = $.trim(ui.draggable[0].textContent);

        // console.log(element[0].attributes[4].value);
        // console.log(text);
        // let datain= ui.draggable[0].attributes[5].value;
        // let dataprein= ui.draggable[0].attributes[6].value;
        // console.log(ui);

        let data: any = {};

        data.randIndex = $(ui.draggable[0]).data("rand-index");
        data.ansIndex = $(ui.draggable[0]).data("ans-index");
        data.elementIndex = $(ui.draggable[0]).data("element-index");

        if (element[0].attributes[4].value === text) {
          ui.draggable.find("p").addClass("disableBack");
          ui.draggable.addClass("pos");
          ui.draggable.draggable("option", "revert", true);
          if (element.hasClass("dropBorder")) {
            element.removeClass("dropBorder");
          }
          if (element.hasClass("errorBorder")) {
            element.removeClass("errorBorder");
            element.addClass("successBorder");
          } else {
            element.addClass("successBorder");
          }
          $(this)
            .find("p")
            .html(text);

          self.onDrop.emit(data);
        } else {
          element.addClass("errorBorder");
          ui.draggable.draggable("option", "revert", true);
        }
      }
    });
  }
}

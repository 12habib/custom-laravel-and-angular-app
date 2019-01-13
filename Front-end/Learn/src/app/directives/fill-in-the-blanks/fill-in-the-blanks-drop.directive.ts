import { Directive, Output, EventEmitter, ElementRef } from "@angular/core";
declare let $: any;

@Directive({
  selector: "[appFillInTheBlanksDrop]"
})
export class FillInTheBlanksDropDirective {
  @Output() blockDrop: EventEmitter<any> = new EventEmitter();

  constructor(private eleRef: ElementRef) {}
  ngOnInit() {
    const self = this;
    let element = $(self.eleRef.nativeElement);
    element.droppable({
      drop: function(event, ui) {
        let data: any = {};
        data.id = $.trim(ui.draggable[0].id);
        data.theIndex = $(ui.draggable[0]).data("index");
        data.elementIndex = $(ui.draggable[0]).data("element-index");

        if (element[0].id === data.id) {
          let cs = ui.draggable.css(["background-color"]);

          ui.draggable.addClass("removeblock");

          if (element.hasClass("box-fill1")) {
            element.removeClass("box-fill1");
          } else {
            element.removeClass("box-fill2");
          }

          element.addClass("shadow");
          element.css({
            margin: "0px 5px 0px 5px",
            minWidth: "72px",
            height: "36px",
            "vertical-align": "middle",
            padding: "5px 10px",
            display: "inline-block",
            color: "white"
          });
          element.css(cs);

          self.blockDrop.emit(data);
        } else {
          element.hasClass("box-fill1");
          element.removeClass("box-fill1");
          element.addClass("box-fill2");

          ui.draggable.draggable("option", "revert", true);
        }
      }
    });
  }
}

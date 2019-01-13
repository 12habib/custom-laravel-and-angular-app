import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "encodeHtml"
})
export class EncodeHtmlPipe implements PipeTransform {
  constructor() {}

  transform(value: any, type: string): any {
    // if (undefined == type || type != "encode") {
    //   var textarea = document.createElement("textarea");
    //   textarea.innerHTML = value;
    //   // console.log("output text:",textarea.value );
    //   return textarea.value;
    // } else {
    //   var textarea = document.createElement("textarea");
    //   textarea.innerHTML = value;
    //   // console.log("output text:",textarea.innerHTML );
    //   return textarea.innerHTML;
    // }
    return value;
  }
}

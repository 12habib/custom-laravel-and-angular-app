import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, args?: number): string {
    if(value.length > args) {
      return value.substring(0, args) + '...';
    }
    return value;
  }

}

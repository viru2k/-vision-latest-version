import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'positive',
})
export class PositivePipe implements PipeTransform {
  transform(value: number, args?: any): any {
    return Math.abs(value);
  }
}

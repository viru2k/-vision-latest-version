import { Injectable } from '@angular/core';
import { DecimalPipe } from '@angular/common';
@Injectable({
  providedIn: 'root',
})
export class Regex {
  constructor(private dp: DecimalPipe) {}
  onInputFormat(value: any) {
    let newVal = value.replace('/^(d{0,2}), {,}/', '');
    //borra espacio

    var hasComma = newVal.indexOf(',');
    var hasDot = newVal.indexOf('.');
    console.log('indexOf found String :' + hasComma);

    if (newVal.length === 0) {
      newVal = '';
    }
    if (hasComma !== -1) {
      newVal = newVal.replace(',', '.');
    }

    newVal = this.dp.transform(newVal, '1.2-2');
    if (newVal !== '0') {
      var isNegative = newVal.indexOf('-');
      if (isNegative != -1) {
        console.log('negative number');
        newVal = newVal.replace(/^(\d{0,2})/, '$1');
      } else {
        console.log('positive number');

        newVal = newVal.replace(/^(\d{0,2})/, '+$1');
      }
    }

    return newVal;
  }
}

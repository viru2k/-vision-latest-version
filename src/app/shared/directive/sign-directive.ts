import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';
import { DecimalPipe } from '@angular/common';

@Directive({
  selector: '[formControlName][appSignMask]',
})
export class SignDirective {
  constructor(public ngControl: NgControl, private cp: DecimalPipe) {}

  @HostListener('ngModelChange', ['$event'])
  onModelChange(event) {
    this.onInputChange(event, false);
  }

  @HostListener('keydown.backspace', ['$event'])
  keydownBackspace(event) {
    this.onInputChange(event.target.value, true);
  }
  /* 
  onInputChange(event, backspace) {
      let newVal = event.replace(/\D/g, '');    
    if (backspace && newVal.length <= 6) {
      newVal = newVal.substring(0, newVal.length - 1);
    }
    if (newVal.length === 0) {
      newVal = '';
    } else if (newVal.length <= 3) {
      newVal = newVal.replace(/^(\d{0,3})/, '($1)');
    } else if (newVal.length <= 6) {
      newVal = newVal.replace(/^(\d{0,3})(\d{0,3})/, '($1) ($2)');
    } else if (newVal.length <= 10) {
      newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '($1) ($2)-$3');
    } else {
      newVal = newVal.substring(0, 10);
      newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '($1) ($2)-$3');
    }
    this.ngControl.valueAccessor.writeValue(newVal);
  } */

  onInputChange(event, backspace) {
    let newVal = event.replace('/^(d{0,2})/', '');
    //borra espacio
    if (backspace && newVal.length <= 10) {
      newVal = newVal.substring(0, newVal.length - 1);
    }

    if (!backspace && newVal.length === 0) {
      newVal = '';
    } else if (!backspace && newVal.length > 1) {
      var index = newVal.indexOf(',');
      console.log('indexOf found String :' + index);
      if (index > 0) {
        newVal = this.cp.transform(newVal, '1.2-2');
      }
    } else if (!backspace && newVal.length === 1) {
      if (newVal !== '0') {
        if (newVal === '-') {
          console.log('negative number');
          newVal = newVal.replace(/^(\d{0,2})/, '$1');
        } else {
          console.log('positive number');

          newVal = newVal.replace(/^(\d{0,2})/, '+$1');
        }
      }
    } /*  else if (!backspace && newVal.length > 1) {
      console.log('mayor than 1 space');      
      console.log('number format', newVal);
      newVal = newVal.replace(/^(\d{0,2})/, '$1');
      console.log('with pipe', newVal);
      if(newVal === ','){
        console.log('coma');
      }else{
        newVal = this.cp.transform(newVal, '1.2-2');
        console.log('number format', newVal);
        newVal = newVal.replace(/^(\d{0,2})/, '$1');
      }
    } */

    var index = newVal.indexOf(',');
    console.log('indexOf found String :' + index);
    // if(!backspace && newVal.length > )

    this.ngControl.valueAccessor.writeValue(newVal);
  }
}

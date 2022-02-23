import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validators } from "@angular/forms";

@Directive({
  selector: '[appSelectorvalidator]',
  providers:[{
    provide: NG_VALIDATORS,
    useExisting: SelectRequiredValidatorDirective,
    multi: true
  }]
})

export class SelectRequiredValidatorDirective implements Validators {
  validate(control: AbstractControl): { [key: string]: any } | null {
    return control.value === '-1'? {'defaultSelected': true}: null;
  }
}

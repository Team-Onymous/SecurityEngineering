/**
 * Created by bryan on 10-1-2019.
 */
import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import * as _ from 'underscore';

/**
 * Inspired by https://scotch.io/tutorials/how-to-implement-a-custom-validator-directive-confirm-password-in-angular-2#toc-custom-confirm-password-validator
 * */
@Directive({
  selector: '[validateEqual][formControlName],[validateEqual][formControl],[validateEqual][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => EqualValidator), multi: true }
  ]
})
export class EqualValidator implements Validator{
  constructor( @Attribute('validateEqual') public validateEqual: string,
               @Attribute('reverse') public reverse: string) {

  }

  private get isReverse() {
    if (!this.reverse) return false;
    return this.reverse === 'true';
  }

  validate(control: AbstractControl): { [key: string]: any } {
    let controlValue = control.value;
    let validateEqualControl = control.root.get(this.validateEqual);

    if (validateEqualControl && controlValue !== validateEqualControl.value && !this.isReverse) {
      return {
        validateEqual: false
      }
    }

    if (!_.isUndefined(validateEqualControl) && validateEqualControl && controlValue === validateEqualControl.value && this.isReverse) {
      if (!_.isNull(validateEqualControl.errors) && !_.isUndefined(validateEqualControl.errors)) {
        delete validateEqualControl.errors['validateEqual'];
        if (!Object.keys(validateEqualControl.errors).length) validateEqualControl.setErrors(null);
      }
    }

    if (!_.isUndefined(validateEqualControl) && validateEqualControl && controlValue !== validateEqualControl.value && this.isReverse) {
      validateEqualControl.setErrors({
        validateEqual: false
      })
    }

    return null;
  }
}

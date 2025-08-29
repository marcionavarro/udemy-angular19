import {AbstractControl, ValidationErrors} from '@angular/forms';

export function campoValidator(control: AbstractControl): ValidationErrors | null {
  return control.value === '-1' || control.value === -1 ? {campoInvalido: true} : null;
}

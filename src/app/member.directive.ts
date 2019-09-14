import { Directive } from '@angular/core';
import { ValidatorFn, FormGroup, ValidationErrors, Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appMember]',
  providers: [{ provide: NG_VALIDATORS, 
    useExisting: MemberDirective, multi: true }]
})
export class MemberDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors {
    return customMemberValidator(control)
  }
}

export const customMemberValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const standard = control.get('standard');
  const schoolclass = control.get('schoolclass');
  const memberColor = control.get('memberColor');

  const isTypeSelected =  standard && schoolclass && standard.value === schoolclass.value ? { 'subscriptionTypeError': true } : null;
  if (isTypeSelected == null){
    if(standard && standard.value===true){
      return memberColor && memberColor.value != '' && memberColor.value != null ? null : { 'colorTypeError': true }
    }
  }
  return isTypeSelected;
};

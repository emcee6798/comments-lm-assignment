import { AbstractControl, ValidationErrors } from '@angular/forms';

const newCommentInputValidator = (control: AbstractControl): ValidationErrors | null => {
  return control.value?.trim().length ? null : { inputError: 'empty input' };
};

export default newCommentInputValidator;

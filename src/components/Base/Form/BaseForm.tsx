import React from 'react';
import BaseFormControl from './BaseFormControl';
import { BaseFormControlType } from '../../../validator/types';

interface BaseFormProps {
  register: any;
  formSchema: BaseFormControlType[];
}

const BaseForm: React.FC<BaseFormProps> = ({ register, formSchema }) => {
  return (
    <>
      {formSchema.map((formControl, count) => {
        return (
          <BaseFormControl
            key={count}
            count={count}
            reference={register({
              required:
                formControl.required !== undefined
                  ? formControl.required
                  : false,
            })}
            {...formControl}
          />
        );
      })}
    </>
  );
};

export default BaseForm;

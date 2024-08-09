import { FormikConfig, Formik, Form as FormikForm } from 'formik';
import React from 'react';

interface Props<V> extends FormikConfig<V> {
  saveGuard?: boolean;
}

const displayName = 'Form';

const Form = <V extends Record<string, any>>({
  children,
  ...props
}: Props<V>) => (
  <Formik<V> {...props}>
    {(injectedProps) => (
      <FormikForm>
        {typeof children == 'function' ? children(injectedProps) : children}
      </FormikForm>
    )}
  </Formik>
);

Form.displayName = displayName;

export default Form;

import React, { ReactNode, RefObject, useState } from 'react';
import cx from 'classnames';
import { useField } from 'formik';
import { nanoid } from 'nanoid';

import InputLabel from '../InputLabel/InputLabel';
import InputComponent, { Props as InputComponentProps } from './InputComponent';

import styles from './Input.module.css';

export interface Appearance {
  theme?: 'fat' | 'underlined' | 'minimal' | 'dotted';
  align?: 'right';
  direction?: 'horizontal';
  colorSchema?: 'dark' | 'grey' | 'transparent';
  helpAlign?: 'right';
  size?: 'small' | 'medium';
  statusSchema?: 'info';
}

export interface Props extends Omit<InputComponentProps, 'placeholder'> {
  /** Appearance object */
  appearance?: Appearance;

  /** Should display the input with the label hidden */
  elementOnly?: boolean;

  /** Add extension of input to the right of it, i.e. for ENS name */
  extensionString?: string;

  /** Extra node to render on the top right in the label */
  extra?: ReactNode;

  /** Help text */
  help?: string;

  /** Html `id` for label & input */
  id?: string;

  /** Pass a ref to the `<input>` element */
  innerRef?: RefObject<any> | ((ref: HTMLElement | null) => void);

  /** Label text */
  label?: string;

  /** Placeholder text */
  placeholder?: string;

  /** Status text */
  status?: string;

  /** Set the input field to a disabled state */
  disabled?: boolean;

  /*
   * Force the input component into an error state.
   *
   * This is to circumvent a issue in Formik where the fieldErrors object
   * gets constantly overwritten, so you cannot actually do custom validaton,
   * while also having a validationSchema declared.
   *
   * Note that this is visual only, it doesn't actually hook into the Form's state,
   * this just "makes" the input field look like it has an error.
   * Any error states need to be maintained externally of this.
   *
   * See: https://github.com/formium/formik/issues/706
   */
  forcedFieldError?: string;

  /** External on change hook */
  onChange?: (e: React.ChangeEvent<any>) => void;
  /** Testing */
  dataTest?: string;
}

const Input = ({
  appearance = {},
  disabled,
  elementOnly,
  extensionString,
  extra,
  help,
  innerRef,
  id: idProp,
  label,
  name,
  placeholder,
  status,
  forcedFieldError,
  maxLength,
  maxButtonParams,
  dataTest,
  onChange,
  onBlur,
}: Props) => {
  const [id] = useState(idProp || nanoid());
  const [inputFieldProps, { error, touched }] = useField<string>(name);

  const inputProps: InputComponentProps = {
    ...inputFieldProps,
    appearance,
    'aria-invalid': (!!error || !!forcedFieldError) && touched,
    id,
    innerRef,
    name,
    placeholder,
    disabled,
    maxLength,
    maxButtonParams,
    dataTest,
    onChange: (event) => {
      inputFieldProps.onChange(event);
      if (onChange) {
        onChange(event);
      }
    },
    onBlur: (event) => {
      inputFieldProps.onBlur(event);
      if (onBlur) {
        onBlur(event);
      }
    },
  };

  const containerClasses = cx(styles.container, {
    [styles.containerHorizontal]: appearance.direction === 'horizontal',
  });
  return (
    <div className={containerClasses}>
      {label && (
        <InputLabel
          appearance={appearance}
          inputId={id}
          label={label}
          help={help}
          extra={extra}
          screenReaderOnly={elementOnly}
        />
      )}
      <div className={styles.extensionContainer}>
        <InputComponent {...inputProps} />
        {extensionString && (
          <div className={styles.extension}>{extensionString}</div>
        )}
      </div>
    </div>
  );
};

Input.displayName = 'Input';

export default Input;

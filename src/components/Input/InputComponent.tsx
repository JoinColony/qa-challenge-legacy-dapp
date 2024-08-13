import React, {
  InputHTMLAttributes,
  RefObject,
} from 'react';

import { getMainClasses } from '../../utils';

import styles from './InputComponent.module.css';

export type Appearance = {
  theme?: 'fat' | 'underlined' | 'minimal' | 'dotted';
  align?: 'right';
  colorSchema?: 'dark' | 'grey' | 'transparent' | 'info';
  size?: 'small' | 'medium';
};

type CleaveHTMLInputElement = HTMLInputElement & { rawValue: string };

export interface MaxButtonParams {
  setFieldValue: (field: any, value: any) => void;
  customOnClickFn?: (...args: any) => any;
  maxAmount: string;
  fieldName: string;
}

export interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'form'> {
  /** Appearance object */
  appearance?: Appearance;

   /** Input field name (form variable) */
  name: string;

  /** Pass a ref to the `<input>` element */
  innerRef?: RefObject<any> | ((ref: HTMLInputElement | null) => void);

  /** Pass params to a max button - implemented only in Cleave options */
  maxButtonParams?: MaxButtonParams;
  /** Testing */
  dataTest?: string;
}

const InputComponent = ({
  appearance,
  innerRef,
  onChange,
  placeholder,
  contentEditable,
  draggable,
  spellCheck,
  maxLength,
  value,
  maxButtonParams,
  dataTest,
  ...props
}: Props) => {
  const length = value ? value.toString().length : 0;

  return !maxLength ? (
    <input
      className={getMainClasses(appearance, styles)}
      onChange={onChange}
      placeholder={placeholder}
      ref={innerRef}
      value={value || ''}
      data-test={dataTest}
      {...props}
    />
  ) : (
    <div className={styles.inputContainer}>
      <input
        className={getMainClasses(
          { paddingRight: 'extra', ...appearance },
          styles,
        )}
        onChange={onChange}
        placeholder={placeholder}
        ref={innerRef}
        maxLength={maxLength}
        value={value || ''}
        data-test={dataTest}
        {...props}
      />
      {maxLength && (
        <span className={styles.characterCounter}>
          {length}/{maxLength}
        </span>
      )}
    </div>
  );
};

export default InputComponent;

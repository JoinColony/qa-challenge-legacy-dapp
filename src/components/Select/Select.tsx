import React, {
  KeyboardEvent,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useField } from 'formik';
import { nanoid } from 'nanoid';
import isEqual from 'lodash/isEqual';

import { getMainClasses } from '../../utils';

import SelectListBox from './SelectListBox';
import { Appearance, SelectOption } from './types';

import InputLabel from '../InputLabel/InputLabel';
import InputStatus from '../InputStatus/InputStatus';

import styles from './Select.module.css';

export const AT = '@';
export const BACKSPACE = 'Backspace';
export const DOWN = 'ArrowDown';
export const ENTER = 'Enter';
export const ESC = 'Escape';
export const SPACE = 'Space';
export const TAB = 'Tab';
export const UP = 'ArrowUp';

export interface Props {
  /** Appearance object */
  appearance?: Appearance;

  /** Should `select` be disabled */
  disabled?: boolean;

  /** Should render the select without a label */
  elementOnly?: boolean;

  /** Help text */
  help?: string;

  /** Html id attribute */
  id?: string;

  /** Label text */
  label: string;

  /** Html name attribute */
  name: string;

  /** Callback function, called after value is changed */
  onChange?: (value: SelectOption['value']) => void;

  /** Available `option`s for the select */
  options: SelectOption[];

  /** Render at the bottom of the select list box */
  optionsFooter?: ReactNode;

  /** Status text */
  placeholder?: string;

  /** Render the actively selected option */
  renderActiveOption?: (
    activeOption: SelectOption | undefined,
    activeOptionLabel: string,
  ) => ReactNode;

  /** Status text */
  status?: string;

  /** Provides value for data-test prop in select button used on cypress testing */
  dataTest?: string;

  /** Provides value for data-test prop in select items used on cypress testing */
  itemDataTest?: string;

  /** In the event form-level onChange validation is disabled, this prop can be passed to activate at the component level */
  validateOnChange?: boolean;
}

const displayName = 'Select';

const Select = ({
  appearance = { alignOptions: 'left', theme: 'default' },
  disabled,
  elementOnly,
  help,
  id: idProp,
  label,
  name,
  onChange: onChangeCallback,
  options = [],
  optionsFooter,
  placeholder,
  renderActiveOption,
  status,
  dataTest,
  itemDataTest,
  validateOnChange,
}: Props) => {
  const [id] = useState<string>(idProp || nanoid());
  const [, { error, value, touched }, { setValue }] = useField(name);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<number>(-1);

  const checkedOption = useMemo(
    () => options.findIndex((option) => isEqual(option.value, value)),
    [value, options],
  );

  const open = () => {
    if (disabled) return;
    setIsOpen(true);
  };

  const close = useCallback(() => {
    setIsOpen(false);
    setSelectedOption(-1);
  }, []);

  const handleOutsideClick = useCallback(
    (evt: MouseEvent) => {
      if (
        wrapperRef.current &&
        evt.target instanceof Node &&
        !wrapperRef.current.contains(evt.target)
      ) {
        close();
      }
    },
    [close],
  );

  const goUp = () => {
    if (selectedOption > 0) {
      setSelectedOption(selectedOption - 1);
    }
  };

  const goDown = () => {
    if (selectedOption < options.length - 1) {
      setSelectedOption(selectedOption + 1);
    }
  };

  const checkOption = () => {
    if (selectedOption === checkedOption || selectedOption === -1) {
      // No change
      close();
      return;
    }
    const { value: optionValue } = options[selectedOption];
    setValue(optionValue, validateOnChange);
    if (onChangeCallback) {
      onChangeCallback(optionValue);
    }
    close();
  };

  const handleKeyOnOpen = (evt: KeyboardEvent<any>) => {
    const { key } = evt;
    switch (key) {
      case SPACE: {
        // prevent page long-scroll when in view
        evt.preventDefault();
        close();
        break;
      }
      case UP: {
        // prevent page scroll when in view
        evt.preventDefault();
        goUp();
        break;
      }
      case DOWN: {
        // prevent page scroll when in view
        evt.preventDefault();
        goDown();
        break;
      }
      case ENTER: {
        // Do not submit form
        evt.preventDefault();
        checkOption();
        break;
      }
      default:
    }
  };

  const handleKeyOnClosed = (evt: KeyboardEvent<HTMLElement>) => {
    const { key } = evt;
    if ([UP, DOWN, SPACE].indexOf(key) > -1) {
      evt.preventDefault();
      setSelectedOption(checkedOption);
      open();
    }
  };

  const handleKeyUp = (evt: KeyboardEvent<HTMLElement>) => {
    // Special keyUp handling for ESC (modals)
    const { key } = evt;
    if (isOpen && key === ESC) {
      evt.stopPropagation();
      close();
    }
  };

  const handleKeyDown = (evt: KeyboardEvent<HTMLElement>) => {
    if (isOpen) {
      handleKeyOnOpen(evt);
      return;
    }
    handleKeyOnClosed(evt);
  };

  const toggle = () => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  };

  const selectOption = (idx: number) => {
    setSelectedOption(idx);
  };

  useEffect(() => {
    if (isOpen) {
      if (document.body) {
        document.body.addEventListener('click', handleOutsideClick, true);
      }
    }
    return () => {
      if (document.body) {
        document.body.removeEventListener('click', handleOutsideClick, true);
      }
    };
  }, [handleOutsideClick, isOpen]);

  const activeOptionDisplay = useMemo<ReactNode>(() => {
    const activeOption = options[checkedOption];
    let activeOptionLabel;
    if (activeOption) {
      if (activeOption.labelElement) {
        activeOptionLabel = activeOption.labelElement;
      } else {
        activeOptionLabel = activeOption.label;
      }
    }

    let placeholderText;
    if (placeholder) {
      placeholderText = placeholder;
    }
    const activeOptionLabelText = (activeOptionLabel || placeholderText || '').toString();

    if (renderActiveOption) {
      return renderActiveOption(activeOption, activeOptionLabelText);
    }
    return <span>{activeOptionLabelText}</span>;
  }, [checkedOption, options, placeholder, renderActiveOption]);

  const listboxId = `select-listbox-${id}`;

  return (
    <div className={styles.main} ref={wrapperRef}>
      <InputLabel
        inputId={id}
        label={label}
        help={help}
        screenReaderOnly={elementOnly}
      />
      <div className={styles.inputWrapper}>
        <button
          className={`${styles.select} ${getMainClasses(appearance, styles)}`}
          aria-haspopup="listbox"
          aria-controls={listboxId}
          aria-expanded={isOpen}
          aria-label={label}
          aria-disabled={disabled}
          id={id}
          tabIndex={0}
          onClick={toggle}
          onKeyUp={handleKeyUp}
          onKeyDown={handleKeyDown}
          type="button"
          name={name}
          data-test={dataTest}
        >
          <div className={styles.selectInner}>
            <div className={styles.activeOption}>{activeOptionDisplay}</div>
          </div>
        </button>
        {isOpen && !!options.length && (
          <SelectListBox
            checkedOption={checkedOption}
            selectedOption={selectedOption}
            listboxId={listboxId}
            options={options}
            optionsFooter={optionsFooter}
            onSelect={selectOption}
            onClick={checkOption}
            appearance={appearance}
            name={name}
            dataTest={itemDataTest}
          />
        )}
      </div>
      {!elementOnly && (
        <InputStatus
          appearance={{ theme: 'minimal' }}
          status={status}
          error={error}
          touched={touched}
        />
      )}
    </div>
  );
};

Select.displayName = displayName;

export default Select;

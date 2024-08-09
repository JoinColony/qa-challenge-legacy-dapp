import React, {
  CSSProperties,
  Dispatch,
  FocusEvent,
  isValidElement,
  SetStateAction,
  useMemo,
} from 'react';
import { State as PopperJsState } from '@popperjs/core';

import { getMainClasses } from '../../../src/utils';

import getPopoverArrowClasses from './getPopoverArrowClasses';
import {
  PopoverAppearanceType,
  PopoverContent as PopoverContentType,
} from './types';

import styles from './PopoverWrapper.module.css';

interface Props {
  appearance?: PopoverAppearanceType;
  arrowRef: Dispatch<SetStateAction<HTMLElement | null>>;
  close: () => void;
  content: PopoverContentType;
  contentRef: Dispatch<SetStateAction<HTMLElement | null>>;
  onFocus: (evt: FocusEvent<HTMLElement>) => void;
  popperAttributes: Record<string, object | undefined>;
  popperStyles: Record<string, CSSProperties>;
  retainRefFocus?: boolean;
  showArrow: boolean;
  state: PopperJsState | null;
}

const displayName = 'PopoverWrapper';

const PopoverWrapper = ({
  appearance,
  arrowRef,
  close,
  content,
  contentRef,
  onFocus,
  popperAttributes,
  popperStyles,
  retainRefFocus,
  showArrow,
  state,
}: Props) => {
  const popoverContent = useMemo(() => {
    if (typeof content === 'string' || isValidElement(content)) {
      return content;
    }
    if (typeof content === 'function') {
      return content({ close });
    }
    return null;
  }, [close, content]);

  return (
    <div
      className={`
        popoverWrapper
        ${getMainClasses(appearance, styles, {
          hideArrow: !showArrow,
          showArrow,
        })}
      `}
      onFocus={onFocus}
      ref={contentRef}
      role="tooltip"
      style={popperStyles.popper}
      tabIndex={retainRefFocus ? -1 : undefined}
      {...popperAttributes.popper}
    >
      {popoverContent}
      {state && state.placement && (
        <span
          className={getPopoverArrowClasses(
            appearance,
            // Use placement derived from popperjs so `auto` isn't used
            state.placement,
            styles,
          )}
          ref={arrowRef}
          style={popperStyles.arrow}
        />
      )}
    </div>
  );
};

PopoverWrapper.displayName = displayName;

export default PopoverWrapper;

import React, { HTMLAttributes } from 'react';

import { useMainClasses } from '../../utils';

import styles from './Tag.module.css';

export interface Appearance {
  /* "light" is default */
  theme:
    | 'primary'
    | 'light'
    | 'golden'
    | 'danger'
    | 'pink'
    | 'blue'
    | 'dangerGhost'
    | 'banned';
  fontSize?: 'tiny' | 'small';
  /* "fullColor" is default */
  colorSchema?: 'fullColor' | 'inverted' | 'plain';
  margin?: 'none';
}

interface Props extends HTMLAttributes<HTMLSpanElement> {
  /** Appearance object */
  appearance?: Appearance;
  /** Text to display in the tag */
  text?: string;
}

const displayName = 'Tag';

const Tag = ({
  appearance,
  children,
  className,
  text,
  ...rest
}: Props) => {
  const classNames = useMainClasses(appearance, styles, className);
  return (
    <span className={classNames} {...rest}>
      {text || children}
    </span>
  );
};

Tag.displayName = displayName;

export default Tag;

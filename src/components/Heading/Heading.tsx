import React, { HTMLAttributes, ReactNode, useMemo } from 'react';

import { getMainClasses } from '../../utils';

import styles from './Heading.module.css';

const displayName = 'Heading';

export type Appearance = {
  theme?: 'primary' | 'dark' | 'invert' | 'uppercase' | 'grey';
  margin?: 'none' | 'small' | 'double';
  size: 'tiny' | 'small' | 'smallish' | 'normal' | 'medium' | 'large' | 'huge';
  weight?: 'thin' | 'medium' | 'bold';
};

interface Props extends HTMLAttributes<HTMLHeadingElement> {
  /** Appearance object */
  appearance?: Appearance;

  /** String that will hard set the heading element to render */
  tagName?: string;

  /** Used to extend the functionality of the component. This will not generate a title attribute on the element. */
  children?: ReactNode;

  /** A string or a `MessageDescriptor` that make up the headings's text */
  text?: string;
}

const Heading = ({
  appearance = { size: 'huge' },
  children,
  tagName,
  text,
  ...props
}: Props) => {
  const { size } = appearance;
  const HeadingElement: any =
    tagName ||
    {
      huge: 'h1',
      large: 'h2',
      medium: 'h3',
      normal: 'h4',
      smallish: 'h4',
      small: 'h5',
      tiny: 'h6',
    }[size || 'huge'];
  const value = useMemo(() => {
    if (children) {
      return children;
    }
    if (!text) {
      return '';
    }
    return text;
  }, [children, text]);
  return (
    <HeadingElement // If `value` is of type `Node` (i.e. children prop), don't add broken title.
      title={typeof value === 'string' ? value : null}
      className={getMainClasses(appearance, styles)}
      {...props}
    >
      {value}
    </HeadingElement>
  );
};

Heading.displayName = displayName;

export default Heading;

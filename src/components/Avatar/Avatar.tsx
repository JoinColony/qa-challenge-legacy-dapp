import React, { CSSProperties, ReactNode } from 'react';

import getIcon from './identicon';
import styles from './Avatar.module.css';

export interface Props {
  /** Seed phrase for blockies fallback (usually an address) */
  seed?: string;

  /** Avatar image URL (can be a base64 encoded string) */
  avatarURL?: string;

  /** If children are present, they will be rendered directly (for svg components) */
  children?: ReactNode;

  /** Extra className */
  className?: string;

  /** Avatars that are not set have a different placeholder */
  notSet?: boolean;

  /** Avatar size (default is between `s` and `m`) */
  size?: 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl';
}

const displayName = 'Avatar';

const Avatar = ({
  seed,
  avatarURL,
  children,
  className,
  size,
}: Props) => {
  const avatar = getIcon(seed);
  const mainClass = size ? styles[size] : styles.main;

  if (children) {
    return (
      <figure
        className={className ? `${mainClass} ${className}` : mainClass}
        title={seed}
      >
        {children}
      </figure>
    );
  }

  const imageStyle: CSSProperties = avatar
    ? {
        // if using a blockie, do pixelated image scaling
        imageRendering: avatarURL ? undefined : 'pixelated',
      }
    : {};

  return (
    <figure
      className={className ? `${mainClass} ${className}` : mainClass}
      title={seed}
    >
      <img
        src={avatar}
        className={styles.image}
        style={imageStyle}
        onError={(e) => {
          // @NOTE: We do this just in case the browser fails to retrieve the avatar
          e.currentTarget.src = avatar;
          e.currentTarget.style.imageRendering = 'pixelated';
        }}
        alt=""
      />
    </figure>
  );
};

Avatar.displayName = displayName;

export default Avatar;

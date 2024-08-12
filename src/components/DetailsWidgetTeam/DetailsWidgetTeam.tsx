import React from 'react';

import ColorTag, { Color } from '../ColorTag/ColorTag';
import { capitalize } from '../../utils';

import styles from './DetailsWidgetTeam.module.css';

const displayName = 'dashboard.ActionsPage.DetailsWidget.DetailsWidgetTeam';

interface Props {
  domainName?: string;
  domainColor?: string;
}

const DetailsWidgetTeam = ({ domainName = '', domainColor }: Props) => (
  <div>
    <ColorTag color={Color[domainColor as Color] || Color.LightPink} />
    <span className={styles.text}>{capitalize(domainName?.toLowerCase())}</span>
  </div>
);

DetailsWidgetTeam.displayName = displayName;

export default DetailsWidgetTeam;

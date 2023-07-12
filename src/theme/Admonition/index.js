import React from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import Translate from '@docusaurus/Translate';
import styles from './styles.module.css';




function NoteIcon() {
  return (
    <svg width="24" height="24" viewBox="24 24">
      <path 

        fillRule="evenodd"
	      d="M 2.93359 8.5 H 13.9336 V 10.5 H 2.93359 V 8.5 Z M 2.93359 6.5 H 13.9336 V 4.5 H 2.93359 V 6.5 Z M 2.93359 14.5 H 9.93359 V 12.5 H 2.93359 V 14.5 Z M 17.9436 11.37 L 18.6536 10.66 C 19.0436 10.27 19.6736 10.27 20.0636 10.66 L 20.7736 11.37 C 21.1636 11.76 21.1636 12.39 20.7736 12.78 L 20.0636 13.49 L 17.9436 11.37 Z M 17.2336 12.08 L 11.9336 17.38 V 19.5 H 14.0536 L 19.3536 14.2 L 17.2336 12.08 Z" />

    </svg>
  );
}
function TipIcon() {
  return (
    <svg width="24" height="24" viewBox="24 24">
      <path
        fillRule="evenodd"
        d="M 9 21 C 9 21.55 9.45 22 10 22 H 14 C 14.55 22 15 21.55 15 21 V 20 H 9 V 21 Z M 12 2 C 8.14 2 5 5.14 5 9 C 5 11.38 6.19 13.47 8 14.74 V 17 C 8 17.55 8.45 18 9 18 H 15 C 15.55 18 16 17.55 16 17 V 14.74 C 17.81 13.47 19 11.38 19 9 C 19 5.14 15.86 2 12 2 Z M 14.85 13.1 L 14 13.7 V 16 H 10 V 13.7 L 9.15 13.1 C 7.8 12.16 7 10.63 7 9 C 7 6.24 9.24 4 12 4 C 14.76 4 17 6.24 17 9 C 17 10.63 16.2 12.16 14.85 13.1 Z"
      />
    </svg>
  );
}
function DangerIcon() {
  return (
    <svg width="24" height="24" viewBox="24 24">
      <path
        fillRule="evenodd"
        d="M 14.59 8 L 12 10.59 L 9.41 8 L 8 9.41 L 10.59 12 L 8 14.59 L 9.41 16 L 12 13.41 L 14.59 16 L 16 14.59 L 13.41 12 L 16 9.41 L 14.59 8 Z M 12 2 C 6.47 2 2 6.47 2 12 C 2 17.53 6.47 22 12 22 C 17.53 22 22 17.53 22 12 C 22 6.47 17.53 2 12 2 Z M 12 20 C 7.59 20 4 16.41 4 12 C 4 7.59 7.59 4 12 4 C 16.41 4 20 7.59 20 12 C 20 16.41 16.41 20 12 20 Z"
      />
    </svg>
  );
}
function InfoIcon() {
  return (
    <svg viewBox="0 0 14 16">
      <path
        fillRule="evenodd"
        d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"
      />
    </svg>
  );
}
function CautionIcon() {
  return (
   <svg width="24" height="24" viewBox="24 24">
      <path
        fillRule="evenodd"
        d="M 12 6.49 L 19.53 19.5 H 4.47 L 12 6.49 Z M 12 2.5 L 1 21.5 H 23 L 12 2.5 Z M 13 16.5 H 11 V 18.5 H 13 V 16.5 Z M 13 10.5 H 11 V 14.5 H 13 V 10.5 Z"
      />
    </svg>
  );
}
// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
const AdmonitionConfigs = {
  note: {
    infimaClassName: 'primary',
    iconComponent: NoteIcon,
    label: (
      <Translate
        id="theme.admonition.note"
        description="The default label used for the Note admonition (:::note)">
        note
      </Translate>
    ),
  },
  tip: {
    infimaClassName: 'success',
    iconComponent: TipIcon,
    label: (
      <Translate
        id="theme.admonition.tip"
        description="The default label used for the Tip admonition (:::tip)">
        tip
      </Translate>
    ),
  },
  danger: {
    infimaClassName: 'danger',
    iconComponent: DangerIcon,
    label: (
      <Translate
        id="theme.admonition.danger"
        description="The default label used for the Danger admonition (:::danger)">
        danger
      </Translate>
    ),
  },
  info: {
    infimaClassName: 'secondary',
    iconComponent: InfoIcon,
    label: (
      <Translate
        id="theme.admonition.info"
        description="The default label used for the Info admonition (:::info)">
        info
      </Translate>
    ),
  },
  caution: {
    infimaClassName: 'warning',
    iconComponent: CautionIcon,
    label: (
      <Translate
        id="theme.admonition.caution"
        description="The default label used for the Caution admonition (:::caution)">
        caution
      </Translate>
    ),
  },
};
// Legacy aliases, undocumented but kept for retro-compatibility
const aliases = {
  secondary: 'note',
  important: 'info',
  success: 'tip',
  warning: 'danger',
};
function getAdmonitionConfig(unsafeType) {
  const type = aliases[unsafeType] ?? unsafeType;
  const config = AdmonitionConfigs[type];
  if (config) {
    return config;
  }
  console.warn(
    `No admonition config found for admonition type "${type}". Using Info as fallback.`,
  );
  return AdmonitionConfigs.info;
}
// Workaround because it's difficult in MDX v1 to provide a MDX title as props
// See https://github.com/facebook/docusaurus/pull/7152#issuecomment-1145779682
function extractMDXAdmonitionTitle(children) {
  const items = React.Children.toArray(children);
  const mdxAdmonitionTitle = items.find(
    (item) =>
      React.isValidElement(item) &&
      item.props?.mdxType === 'mdxAdmonitionTitle',
  );
  const rest = <>{items.filter((item) => item !== mdxAdmonitionTitle)}</>;
  return {
    mdxAdmonitionTitle,
    rest,
  };
}
function processAdmonitionProps(props) {
  const {mdxAdmonitionTitle, rest} = extractMDXAdmonitionTitle(props.children);
  return {
    ...props,
    title: props.title ?? mdxAdmonitionTitle,
    children: rest,
  };
}
export default function Admonition(props) {
  const {children, type, title, icon: iconProp} = processAdmonitionProps(props);
  const typeConfig = getAdmonitionConfig(type);
  const titleLabel = title ?? typeConfig.label;
  const {iconComponent: IconComponent} = typeConfig;
  const icon = iconProp ?? <IconComponent />;
  return (
    <div
      className={clsx(
        ThemeClassNames.common.admonition,
        ThemeClassNames.common.admonitionType(props.type),
        'alert',
        `alert--${typeConfig.infimaClassName}`,
        styles.admonition,
      )}>
      <div className={styles.admonitionHeading}>
        <span className={styles.admonitionIcon}>{icon}</span>
        {titleLabel}
      </div>
      <div className={styles.admonitionContent}>{children}</div>
    </div>
  );
}

import React from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/theme-common/internal';
import LastUpdated from '@theme/LastUpdated';
import styles from './styles.module.css';

function LastUpdatedRow({
  lastUpdatedAt,
  lastUpdatedBy,
  formattedLastUpdatedAt,
}) {
  return (
    <div className={clsx(ThemeClassNames.docs.docFooterEditMetaRow, 'row')}>
      <div className={clsx('col', styles.lastUpdated)}>
        {(lastUpdatedAt || lastUpdatedBy) && (
          <LastUpdated
            lastUpdatedAt={lastUpdatedAt}
            formattedLastUpdatedAt={formattedLastUpdatedAt}
          />
        )}
      </div>
    </div>
  );
}
export default function DocItemHeader() {
  const {metadata} = useDoc();
  const {lastUpdatedAt, formattedLastUpdatedAt } =
    metadata;
  const canDisplayLastUpdatedRow = !!(lastUpdatedAt);
  const canDisplayHeader = canDisplayLastUpdatedRow;
  if (!canDisplayHeader) {
    return null;
  }
  return (
    <div
      className={clsx(ThemeClassNames.docs.docFooter, 'docusaurus-mt-lg')}>
      {canDisplayLastUpdatedRow && (
        <LastUpdatedRow
          lastUpdatedAt={lastUpdatedAt}
          formattedLastUpdatedAt={formattedLastUpdatedAt}
        />
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { Widget } from '@happyreact/react';
import styles from './styles.module.css';
import '@happyreact/react/theme.css';
 
const VotedYes = () => {
  return <span>Thanks for your feedback. We are glad you like it :)</span>;
};
 
const VotedNo = () => {
  return <span>Thanks for your feedback. We will try to improve :(</span>;
};
 
export default function Feedback({ resource }) {
  const [reaction, setReaction] = useState(null);
 
  const isReacted = reaction === 'Yes' || reaction === 'No';
  const _resource = String(resource).replace(/\//g, '-');
 
  const handleReaction = (params) => {
    setReaction(params.icon);
  };
 
  return (
    <div className={styles.root}>
      <h3 className={styles.title}>Was this page helpful?</h3>
      {!isReacted ? (
        <div className="">
          <Widget
            token=""
            resource={_resource}
            classes={{
              root: styles.widget,
              container: styles.container,
              grid: styles.grid,
              cell: styles.cell,
              reaction: styles.reaction,
            }}
            onReaction={handleReaction}
          />
        </div>
      ) : reaction === 'No' ? (
        <VotedNo />
      ) : (
        <VotedYes />
      )}
    </div>
  );
}
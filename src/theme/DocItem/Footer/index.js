import React from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/theme-common/internal';
import EditThisPage from '@theme/EditThisPage';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';



import { FaDev, FaGithub, FaTwitter, FaStackOverflow, FaSlack } from "react-icons/fa";

function EditMetaRow({
  editUrl,
}) {
  return (
    <div className={clsx(ThemeClassNames.docs.docFooterEditMetaRow, 'row')}>
      <div className="col">{editUrl && <EditThisPage editUrl={editUrl} />}</div>
    </div>
  );
}
export default function DocItemFooter() {
  const {metadata} = useDoc();
  const {editUrl} =
    metadata;
  const canDisplayEditMetaRow = !!(editUrl);
  const canDisplayFooter = canDisplayEditMetaRow;
  if (!canDisplayFooter) {
    return null;
  }
  return (
    <footer
      className={clsx(styles.li, ThemeClassNames.docs.docFooter)}>
      
<hr />
      <div class="container">
        <div class="row">
          <div class="col col--8">
            <div class="col-demo">
              <h4>See something not documented or want to contribute?</h4>
                  <ul className="text-sm">
                    <li>
                      Submit a{' '}
                      <Link to="https://github.com/gobeyondidentity/developer-docs/issues/new?assignees=&labels=triage&projects=&template=content-issue.yml&title=%5BContent+issue%5D%3A+">
                        content issue
                      </Link>
                    </li>
                    <li>
                      Suggest an{' '}
                      <Link to="https://github.com/gobeyondidentity/developer-docs/issues/new?assignees=&labels=%F0%9F%8C%9F+enhancement&projects=&template=enhancement.yml">
                        idea for the documentation
                      </Link>
                    </li>
                    <li>{canDisplayEditMetaRow && (
        <EditMetaRow
          editUrl={editUrl}
        />
      )}</li>
                  </ul>
              </div>

          </div>
          <div class='col col--4'>
            <div class="col-demo">
              <h4>Join our community!</h4>
                <ul className={clsx('no-style', styles.indent)}>
                    <li class="no-style"><FaGithub />&nbsp;&nbsp;<a href="https://github.com/gobeyondidentity" target="_blank">GitHub</a></li>
                    <li class="no-style"><FaStackOverflow />&nbsp;&nbsp;<a href="https://stackoverflow.com/questions/tagged/beyondidentity" target="_blank">Stack Overflow</a></li>
                    <li class="no-style"><FaSlack />&nbsp;&nbsp;<a href="https://byndid.slack.com/join/shared_invite/zt-1anns8n83-NQX4JvW7coi9dksADxgeBQ#/shared-invite/email" target="_blank">Slack</a></li>
                    <li class="no-style"><FaTwitter />&nbsp;&nbsp;<a href="https://twitter.com/BI_Developers" target="_blank">Twitter</a></li>
                    <li class="no-style"><FaDev />&nbsp;&nbsp;<a href="https://dev.to/beyondidentity" target="_blank">DevTo</a></li>
                  </ul>
              </div>
          </div>
        </div>
      </div>

    </footer>
  );
}

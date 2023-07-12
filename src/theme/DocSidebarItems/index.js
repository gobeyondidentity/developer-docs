import Link from "@docusaurus/Link"
import { ThemeClassNames } from "@docusaurus/theme-common"
import { useDocsVersion } from "@docusaurus/theme-common/internal"
import { Badge } from "@mui/material"
// import latestRelease from "@site/latestRelease.json"
import DocSidebarItems from "@theme-original/DocSidebarItems"
import NavbarItem from "@theme-original/NavbarItem"
import clsx from "clsx"
import React from "react"
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';


export default function DocSidebarItemsWrapper(props) {
  

  return (
    <>
      {props.level === 1 ? (
        <li
          className={clsx(
            ThemeClassNames.docs.docSidebarItemLink,
            "theme-doc-sidebar-item-link-level-1",
          //  "version-selector",
            "margin-top--sm",
            "margin-bottom--md",
            "margin-left--sm"
          )}
        >


        </li>
      ) : null}
      <DocSidebarItems {...props} />
    </>
  )
}
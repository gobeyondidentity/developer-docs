import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import HomepageFeatures from "../components/HomepageFeatures";
import Head from '@docusaurus/Head';


function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/get-started"
          >
            Getting started
          </Link>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Link
            className="button button--secondary button--lg"
            to="/docs"
          >
            Documentation
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="Home"
      description="Beyond Identity is an Identity and Access Management Platform for people who prefer not getting breached"
    >
    <Head>
      <meta name='zd-site-verification' content='au3duh2xhkj2o7itdkfvc' />
    </Head>
    <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}

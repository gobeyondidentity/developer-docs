import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import styles from "./HomepageFeatures.module.css";

const FeatureList1 = [
  {
    title: "Getting Started",
    Svg: require("@site/static/img/get-started.svg").default,
    description: <>Get started with Beyond Identity with ready-made instructions for common use cases.</>,
    link: "/docs/get-started", // use relative path for internal routes
  },
  {
    title: "Integration Guides",
    Svg: require("@site/static/img/tutorials.svg").default,
    description: <>Get step-by-step instructions for common use cases and third-party integrations.</>,
    link: "/docs/integration-guides",
  },
  {
    title: "Platform Overview",
    Svg: require("@site/static/img/platform.svg").default,
    description: <>A review of our platform and how to put it to good use.</>,
    link: "/docs/platform-overview",
  },
];

const FeatureList2 = [
  {
    title: "API Reference ⧉",
    Svg: require("@site/static/img/reference.svg").default,
    description: <>Manage resources programmatically with our API and CLI tools.</>,
    link: "/api/v1",
  },
  {
    title: "Products ⧉",
    Svg: require("@site/static/img/products.svg").default,
    description: <>Learn more about our products and how to use them.</>,
    link: "https://www.beyondidentity.com",
  },
  {
    title: "Support ⧉",
    Svg: require("@site/static/img/slack.svg").default,
    description: <>Join our Slack community for questions or support with your Beyond Identity account.</>,
    link: "https://join.slack.com/t/byndid/shared_invite/zt-1anns8n83-NQX4JvW7coi9dksADxgeBQ",
  },
];

function CardContent({ Svg, title, description }) {
  return (
    <>
      <div className="card__svg padding-top--xs padding-right--sm">
        <Svg className={styles.featureSvg} role="img" aria-label={title} />
      </div>
      <div className="tile_content">
      <h4 className="card__title">{title}</h4>
      <p className="card__subtitle">{description}</p>
      </div>
    </>
  );
}

function Feature({ Svg, title, description, link }) {
  // treat absolute URLs to your own site as internal (so Link works + no full reload)
  const origin = "https://developer.beyondidentity.com";
  const isAbsolute = /^https?:\/\//i.test(link);
  const isSameOrigin = isAbsolute && link.startsWith(origin);
  const normalized = isSameOrigin ? link.replace(origin, "") : link;

  if (!isAbsolute || isSameOrigin) {
    // Internal link
    return (
      <Link className={clsx("square col col--4", styles.cardLink)} to={normalized}>
        <CardContent Svg={Svg} title={title} description={description} />
      </Link>
    );
  }

  // External link
  return (
    <a
      className={clsx("square col col--4", styles.cardLink)}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <CardContent Svg={Svg} title={title} description={description} />
    </a>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList1.map((props, idx) => (
            <Feature key={`f1-${idx}`} {...props} />
          ))}
        </div>
        <div className="row">
          {FeatureList2.map((props, idx) => (
            <Feature key={`f2-${idx}`} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

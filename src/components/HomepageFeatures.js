import React from "react";
import clsx from "clsx";
import styles from "./HomepageFeatures.module.css";

const FeatureList1 = [
  {
    title: "Getting started",
    Svg: require("../../static/img/get-started.svg").default,
    description: (
      <>
        Get started with Beyond Identity with ready made instructions for common use cases.
      </>
    ),
    link: (
      "/docs/v1/getting-started"
    )
  },
  {
    title: "Platform Overview",
    Svg: require("../../static/img/platform.svg").default,
    description: (
      <>
        A review of our platform and how to put it to good use. 
      </>
    ),
    link: (
      "/docs/v1/platform-overview/architecture"
    )
  },
  {
    title: "Products",
    Svg: require("../../static/img/products.svg").default,
    description: (
      <>
        Detailed information on our  products and how to use them. 
      </>
    ),
    link: (
      "https://www.beyondidentity.com/products/secure-customers"
    )
  },
 ];

 const FeatureList2 = [
  {
    title: "Reference",
    Svg: require("../../static/img/reference.svg").default,
    description: (
      <>
        Manage resources programmatically with our API and CLI tools. 
      </>
    ),
    link: (
      "/api/v1"
    )
  },
  {
    title: "Guides",
    Svg: require("../../static/img/tutorials.svg").default,
    description: (
      <>
        Get step-by step instructions for common use cases and third-party integrations. 
      </>
    ),
    link: (
      "/guides/guide1"
    )
  },
  {
    title: "Support",
    Svg: require("../../static/img/support.svg").default,
    description: (
      <>
        Start here for technical support with your Beyond Identity account. 
      </>
    ),
    link: (
      "https://support.beyondidentity.com/"
    )
  },
];

function Feature({ Svg, title, description, link }) {
  return (
    <div className={clsx("square col col--4")}>
      <a className="card__link" href={link}></a>
      <div className="card__svg padding-top--xs padding-right--sm">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="tile_content">
        <div className="card__title">{title}</div>
        <div className="card__subtitle">{description}</div>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList1.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
        <div className="row">
          {FeatureList2.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

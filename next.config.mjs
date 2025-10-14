import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} from "next/constants.js";

export default setupSerwist({
  typedRoutes: true,
  webpack: setupSvgr({
    icon: true,
  }),
});

/**
 * @param {import("next").NextConfig} config
 * @see {@link https://serwist.pages.dev/docs/next/getting-started | `@serwist/next` - serwist documentation}
 */
function setupSerwist(config) {
  /** @param {string} phase */
  return async (phase) => {
    if (
      phase === PHASE_DEVELOPMENT_SERVER ||
      phase === PHASE_PRODUCTION_BUILD
    ) {
      const { default: withSerwistInit } = await import("@serwist/next");
      const withSerwist = withSerwistInit({
        swSrc: "app/sw.ts",
        swDest: "public/sw.js",
      });
      return withSerwist(config);
    }

    return config;
  };
}

/**
 * note: this config is based on the svgr usage documentation for next.js found
 * [here](https://github.com/gregberge/svgr/blob/785cba4/website/pages/docs/next.mdx).
 * it makes some assumptions about the webpack rules applied by next.js and may
 * not be as resilient to future changes.
 * @param {import("@svgr/core").Config} options
 * @see {@link https://react-svgr.com/docs/next | next.js - svgr documentation}
 */
function setupSvgr(options) {
  /** @param {import("webpack").Configuration} config */
  return (config) => {
    // get the existing rule that handles .svg imports
    const existingRule = config.module.rules.find((rule) =>
      rule?.test?.test?.(".svg"),
    );

    config.module.rules.push(
      // reapply existing rule for .svg imports ending with "?url"
      {
        ...existingRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      // use svgr loader for all other .svg imports
      {
        test: /\.svg$/i,
        issuer: existingRule.issuer,
        resourceQuery: {
          not: [...existingRule.resourceQuery.not, /url/],
        },
        use: {
          loader: "@svgr/webpack",
          options,
        },
      },
    );

    // modify existing rule to ignore .svg imports
    existingRule.exclude = /\.svg$/i;

    return config;
  };
}

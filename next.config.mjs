import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} from "next/constants.js";

/** @type {import("next").NextConfig} */
const config = {
  typedRoutes: true,
  /** @param {import("webpack").Configuration} config */
  webpack: (config) => {
    config.module?.rules?.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/i,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            icon: true,
          },
        },
      ],
    });
    return config;
  },
};

/** @param {string} phase */
export default async function getConfig(phase) {
  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const { default: withSerwistInit } = await import("@serwist/next");
    const withSerwist = withSerwistInit({
      swSrc: "app/sw.ts",
      swDest: "public/sw.js",
    });
    return withSerwist(config);
  }

  return config;
}

// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
const { withSentryConfig } = require("@sentry/nextjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["storage.googleapis.com", "shdw-drive.genesysgo.net"],
    minimumCacheTTL: 1500000,
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
  env: {
    BROWSER: "",
  },
};

module.exports = nextConfig;

module.exports = withSentryConfig(
  module.exports,
  { silent: true, authToken: process.env.NEXT_PUBLIC_SENTRY_AUTH_TOKEN },
  { hideSourcemaps: true }
);

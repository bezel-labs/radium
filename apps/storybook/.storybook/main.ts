import type { StorybookConfig } from '@storybook/react-vite';

import { dirname } from "path"

import { fileURLToPath } from "url"

import { mergeConfig } from "vite"

/**
* This function is used to resolve the absolute path of a package.
* It is needed in projects that use Yarn PnP or are set up within a monorepo.
*/
function getAbsolutePath(value: string) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)))
}
const config: StorybookConfig = {
  "stories": [
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-docs')
  ],
  "framework": getAbsolutePath('@storybook/react-vite'),
  core: {
    // Storybook manager's host check rejects "*.csb.app" subdomains otherwise.
    // Wildcards aren't supported; sandbox IDs are per-fork, so allow all hosts.
    allowedHosts: true
  },
  viteFinal: async (config) =>
    mergeConfig(config, {
      server: { allowedHosts: [".csb.app"] }
    })
};
export default config;

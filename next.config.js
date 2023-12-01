const { withContentlayer } = require("next-contentlayer");
const repo='https://bre01.github.io'
const myAssetPrefix=`/${repo}`;
const myBasePath=`$/{repo}`


const isGithubActions = process.env.GITHUB_ACTIONS || false

let assetPrefix = ''
let basePath = '/'

if (isGithubActions) {
  // trim off `<owner>/`
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '')

  assetPrefix = `/${repo}/`
  basePath = `/${repo}`
}



/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  assetPrefix:assetPrefix,
  basePath:basePath,
};

module.exports = withContentlayer(nextConfig);

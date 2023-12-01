const { withContentlayer } = require("next-contentlayer");



const isGithubActions = process.env.GITHUB_ACTIONS || false

let assetPrefix = ''
let basePath = ''

if (isGithubActions) {
  // trim off `<owner>/`
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '')

  
  assetPrefix = ``
  basePath = ``
}



/** @type {import('next').NextConfig} */
const nextConfig = {
	output:"export",
  reactStrictMode: true,
  swcMinify: true,
  assetPrefix:assetPrefix,
  basePath:basePath,
  images:{
    unoptimized:true,
  }
};

module.exports = withContentlayer(nextConfig);

/** @type {import('next').NextConfig} */
const repo = 'emprego_maranhao'; // nome do seu repositório

const nextConfig = {
  output: 'export',
  basePath: `/${repo}`,
  assetPrefix: `/${repo}/`,
};

module.exports = nextConfig;

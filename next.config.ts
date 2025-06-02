/** @type {import('next').NextConfig} */
const repo = "emprego_maranhao";
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export", // necessário para next export
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",
};

export default nextConfig;

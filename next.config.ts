import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  output: "export",
  // Se seu repositório não for raiz, adicione o basePath:
  // basePath: '/NOME-DO-REPO',
  // assetPrefix: '/NOME-DO-REPO',
};

export default nextConfig;

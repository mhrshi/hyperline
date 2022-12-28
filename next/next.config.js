import { dirname, join } from "path";
import { fileURLToPath } from "url";

const pathToThisDir = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [join(pathToThisDir, "src", "styles")],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  redirects: async () => [
    {
      source: "/",
      destination: "/setup",
      permanent: true,
    },
  ],
};

export default nextConfig;

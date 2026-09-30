import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // URL courte imprimée sur la plaquette Sécurité privée (30/09/2026)
  async redirects() {
    return [{ source: "/securite-privee", destination: "/sur-mesure/securite-privee", permanent: true }];
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    // Autores colam URLs de imagem arbitrárias no admin (sem CDN fixo),
    // então liberamos qualquer host https em vez de fixar um domínio.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;

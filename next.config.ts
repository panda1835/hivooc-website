import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/trang-chu",
        destination: "/",
        permanent: true,
      },
      {
        source: "/:locale(en|vi)/trang-chu",
        destination: "/:locale",
        permanent: true,
      },
      {
        source: "/destination/:path*",
        destination: "/destinations/:path*",
        permanent: true,
      },
      {
        source: "/:locale(en|vi)/destination/:path*",
        destination: "/:locale/destinations/:path*",
        permanent: true,
      },
      {
        source: "/our-story",
        destination: "/about-us",
        permanent: true,
      },
      {
        source: "/:locale(en|vi)/our-story",
        destination: "/:locale/about-us",
        permanent: true,
      },
      {
        source: "/tours",
        destination: "/en/tailor-trip",
        permanent: true,
      },
      {
        source: "/:locale(en|vi)/tours",
        destination: "/:locale/tailor-trip",
        permanent: true,
      },
    ];
  },
  images: {
    unoptimized: true,
    qualities: [75, 90],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);

import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const robotsTxt = `UserAgent: *
${ process.env.SERVER_ENV === "production" ? `
Allow: /
Sitemap: https://genshin-dictionary.com/sitemap.xml
` : "Disallow: /" }`;

  res.setHeader("Content-Type", "text/plain");
  res.write(robotsTxt);
  res.end();

  return {
    props: {},
  };
};

const RobotsTxt = (): void => {
  // Do nothing on frontend
};

export default RobotsTxt;

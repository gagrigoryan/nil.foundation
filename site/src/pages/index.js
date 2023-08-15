import { REVALIDATE } from 'constants/index';

import Home from 'pages/Home';
import MetaLayout from 'components/MetaLayout';

import { homePageData, seoData } from 'stubs/homePageData';
import { getSiteConfig } from 'src/strapi/getSiteConfig';

const HomePage = ({ data, seo, config }) => {
  return (
    <MetaLayout seo={seo}>
      <Home data={data} />
    </MetaLayout>
  );
};

export async function getStaticProps() {
  const config = await getSiteConfig();
  return {
    props: {
      data: homePageData,
      seo: seoData,
      config: config,
    },
    revalidate: REVALIDATE,
  };
}

export default HomePage;

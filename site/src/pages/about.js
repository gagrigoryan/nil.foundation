import { REVALIDATE } from 'constants/index';

import About from 'pages/About';
import MetaLayout from 'components/MetaLayout';

import { aboutPageData, seoData } from 'stubs/aboutPageData';
import { getSiteConfig } from 'src/strapi';

const AboutPage = ({ data, seo }) => (
  <MetaLayout seo={seo}>
    <About data={data} />
  </MetaLayout>
);

export async function getStaticProps() {
  const config = await getSiteConfig();
  return {
    props: { data: aboutPageData, seo: seoData, config: config },
    revalidate: REVALIDATE,
  };
}

export default AboutPage;

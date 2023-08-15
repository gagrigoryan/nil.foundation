import { REVALIDATE } from 'constants/index';

import ZkLlvm from 'pages/ZkLlvm';
import MetaLayout from 'components/MetaLayout';
import { getSiteConfig } from 'src/strapi';

import { zkllvmPageData, seoData } from 'stubs/zkllvmPageData';

const ZkLlvmPage = ({ data, seo }) => (
  <MetaLayout seo={seo}>
    <ZkLlvm data={data} />
  </MetaLayout>
);

export async function getStaticProps() {
  const config = await getSiteConfig();
  return {
    props: { data: zkllvmPageData, seo: seoData, config },
    revalidate: REVALIDATE,
  };
}

export default ZkLlvmPage;

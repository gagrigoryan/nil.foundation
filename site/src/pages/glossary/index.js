import MetaLayout from 'components/MetaLayout/MetaLayout';
import { REVALIDATE } from 'constants/common';

import Glossary from 'pages/Glossary';

import { seoData } from 'stubs/glossaryPageData';
import { getCollection, getSiteConfig } from 'src/strapi';
import { groupBy } from 'utils/groupArrayByField';

const GlossaryPage = ({ cms, seo }) => {
  return (
    <MetaLayout seo={seo}>
      <Glossary data={cms.normalizedGlossary} />
    </MetaLayout>
  );
};

export async function getStaticProps() {
  const [glossary, config] = await Promise.all([
    getCollection('glossaries', {
      populate: '*',
      pagination: {
        page: 1,
        pageSize: 1000,
      },
      sort: ['letter:asc'],
    }),
    getSiteConfig(),
  ]);

  const normalizedGlossary = groupBy(glossary, 'letter');

  return {
    revalidate: REVALIDATE,
    props: {
      cms: {
        normalizedGlossary,
      },
      seo: seoData,
      config,
    },
  };
}

export default GlossaryPage;

import { REVALIDATE } from 'constants/common';

import Research, { ResearchLayout } from 'pages/Research';
import MetaLayout from 'components/MetaLayout';

import { getCollection, getAllPath, getSiteConfig } from 'src/strapi';
import { seoData } from 'stubs/researchCards';

const TagPage = ({ cms, seo }) => (
  <MetaLayout seo={seo}>
    <Research data={cms} />
  </MetaLayout>
);

TagPage.getLayout = page => {
  const tags = page?.props?.cms?.tags ?? [];
  return <ResearchLayout tags={tags}>{page}</ResearchLayout>;
};

export async function getStaticProps({ params: { slug } }) {
  const [posts, tags, config] = await Promise.all([
    getCollection('research', {
      filters: {
        tags: {
          name: {
            $eq: slug,
          },
        },
      },
    }),
    getCollection('tags', {
      filters: {
        research: {
          id: {
            $notNull: true,
          },
        },
      },
    }),
    await getSiteConfig(),
  ]);

  return {
    revalidate: REVALIDATE,
    props: {
      cms: {
        posts,
        tags,
      },
      config,
      seo: seoData,
    },
  };
}

export async function getStaticPaths() {
  const tags = await getAllPath('tags', {
    filters: {
      research: {
        id: {
          $notNull: true,
        },
      },
    },
  });

  const paths = tags.map(tag => ({
    params: { slug: tag.slug },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export default TagPage;

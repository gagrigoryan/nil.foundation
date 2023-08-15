import { REVALIDATE } from 'constants/common';
import { getCollection, getCollectionAndMeta } from 'src/strapi';

import BlogPage from 'pages/BlogsPage';
import MetaLayout from 'components/MetaLayout';

import { seoData } from 'stubs/blogs';
import { getSiteConfig } from 'src/strapi/getSiteConfig';

const Blogs = ({ cms, seo }) => (
  <MetaLayout seo={seo}>
    <BlogPage data={cms} />
  </MetaLayout>
);

export async function getStaticProps() {
  const [posts, tags, categories, config] = await Promise.all([
    getCollectionAndMeta('blogs', {
      sort: ['date:desc', 'isFeature:desc'],
      pagination: {
        page: 1,
        pageSize: 10,
      },
    }),
    getCollection('tags', {
      filters: {
        blogs: {
          id: {
            $notNull: true,
          },
        },
      },
    }),
    getCollection('categories'),
    getSiteConfig(),
  ]);

  return {
    revalidate: REVALIDATE,
    props: {
      cms: {
        posts: posts.blogs,
        tags,
        categories,
        meta: posts.meta,
      },
      seo: seoData,
      config,
    },
  };
}

export default Blogs;

import { REVALIDATE } from 'constants/common';
import {
  getAllPath,
  getCollection,
  getCollectionAndMeta,
  getSiteConfig,
} from 'src/strapi';

import BlogPage from 'pages/BlogsPage';
import MetaLayout from 'components/MetaLayout';

import { seoData } from 'stubs/blogs';

const Blogs = ({ cms, seo }) => (
  <MetaLayout seo={seo}>
    <BlogPage data={cms} />;
  </MetaLayout>
);

export async function getStaticProps({ params: { slug } }) {
  const [posts, tags, categories, config] = await Promise.all([
    getCollectionAndMeta('blogs', {
      sort: ['date:desc', 'isFeature:desc'],
      filters: {
        tags: {
          name: {
            $eq: slug,
          },
        },
      },
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

export async function getStaticPaths() {
  const tags = await getAllPath('tags');

  const paths = tags.map(tag => ({
    params: { slug: tag.slug },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export default Blogs;

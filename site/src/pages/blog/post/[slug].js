import PostPage from 'pages/PostPage';
import MetaLayout from 'components/MetaLayout';

import { getAllPath, getCollection, getSingleBySlug, getSiteConfig } from 'src/strapi';

import { REVALIDATE } from 'constants/common';

import { postPage } from 'stubs/postPageData';

const Post = ({ data, recommendedPosts, content }) => (
  <MetaLayout seo={{ title: data.title, description: data.description || '' }}>
    <PostPage
      post={data}
      recommendedPosts={recommendedPosts}
      content={content}
    />
  </MetaLayout>
);

export async function getStaticProps({ params: { slug } }) {
  const [posts, articles, config] = await Promise.all([
    getCollection('blogs', {
      filters: {
        $or: [
          {
            slug: {
              $notIn: slug,
            },
          },
        ],
      },
      pagination: {
        start: 0,
        limit: 3,
      },
      sort: ['date:desc'],
    }),
    getSingleBySlug('blogs', slug, {
      tags: {
        populate: '*',
      },
      category: {
        populate: '*',
      },
      recommendedBlogs: {
        populate: '*',
      },
    }),
    getSiteConfig(),
  ]);

  if (!articles) {
    return {
      notFound: true,
    };
  }

  return {
    revalidate: REVALIDATE,
    props: {
      data: articles,
      recommendedPosts:
        articles.recommendedPosts.length > 0
          ? articles.recommendedPosts
          : posts,
      content: postPage,
      config,
    },
  };
}

export async function getStaticPaths() {
  const articles = await getAllPath('blogs');


  const paths = articles.map(article => ({
    params: { slug: article.slug },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export default Post;

import { useCallback, useEffect, useMemo, useState } from 'react';
import { arrayOf, bool, number, shape, string } from 'prop-types';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import cx from 'classnames';
import axios from 'axios';

import { useViewport } from 'hooks/useViewport';
import { useRouter } from 'next/router';
import { useScroll } from 'hooks/useScroll';

import Container from 'components/Container';
import PostCard from 'components/PostCard';
import TagButton from 'components/TagButton';
import Button from 'components/Button';
import BlogNavigation from 'pages/BlogsPage/BlogNavigation';
import FooterAnimationSection from 'components/FooterAnimationSection';
import ArticlesNotFound from './ArticlesNotFound';

import s from './BlogsPage.module.scss';

const BlogsPage = ({ data }) => {
  const { isMobile } = useViewport();
  const { scrollToTop } = useScroll();
  const router = useRouter();

  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTag, setActiveTag] = useState('');

  const [currentBlogs, setCurrentBlogs] = useState(data.posts);
  const [currentMeta, setCurrentMeta] = useState(data.meta);

  const currentMetaPage = useMemo(() => {
    return currentMeta.page;
  }, [currentMeta]);

  const hasMoreBlogs = useMemo(() => {
    return currentMetaPage < currentMeta.pageCount;
  }, [currentMeta.pageCount, currentMetaPage]);

  const getFilters = useCallback(
    value => {
      const isCategory = data.categories.some(item => item.name === value);

      const filterBy = {
        [isCategory ? 'category' : 'tags']: {
          name: {
            $eq: value,
          },
        },
      };

      if (value === '' || value === 'All') {
        return {};
      }

      return filterBy;
    },
    [data.categories]
  );

  const handleLoadMore = async () => {
    if (!hasMoreBlogs) return;

    const filters = getFilters(
      router.query.category || router.query.slug || ''
    );

    const newBlogs = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs`,
      {
        page: currentMetaPage + 1,
        filters,
      }
    );

    setCurrentBlogs([...currentBlogs, ...newBlogs.data.blogs]);
    setCurrentMeta(newBlogs.data.meta);
  };

  const fethCurrentBlogs = useCallback(
    async value => {
      if (currentMetaPage === 1) {
        const filters = getFilters(value);

        const newBlogs = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs`,
          {
            page: 1,
            filters,
          }
        );

        setCurrentBlogs(newBlogs.data.blogs);
        setCurrentMeta(newBlogs.data.meta);
      }
    },
    [currentMetaPage, getFilters]
  );

  useEffect(() => {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, [currentBlogs]);

  const setCurrentCategory = useCallback(
    category => {
      setActiveCategory(category);
      fethCurrentBlogs(category);
    },
    [fethCurrentBlogs]
  );

  const setCurrentTag = useCallback(
    tag => {
      setActiveTag(tag);
      fethCurrentBlogs(tag);
    },
    [fethCurrentBlogs]
  );

  const onCategoryClick = useCallback(
    category => {
      setActiveTag('');
      scrollToTop();
      setCurrentMeta({ page: 1 });
      router.push({ pathname: '/blog', query: { category } }, '/blog');
    },
    [router, scrollToTop]
  );

  const onTagClick = useCallback(
    tag => {
      setActiveCategory('All');
      scrollToTop();
      setCurrentMeta({ page: 1 });
      router.push(`/blog/tag/${tag}`);

      if (tag === activeTag) {
        onCategoryClick('All');
      }
    },
    [activeTag, onCategoryClick, router, scrollToTop]
  );

  useEffect(() => {
    if (router.query.slug) {
      setCurrentTag(router.query.slug);
    }
    if (router.query.category) {
      setCurrentCategory(router.query.category);
    }
  }, [
    router.query.slug,
    router.query.category,
    setCurrentCategory,
    setCurrentTag,
  ]);

  return (
    <Container className={s.container}>
      <BlogNavigation
        onTagClick={onTagClick}
        onCategoryClick={onCategoryClick}
        activeTags={[activeTag]}
        activeCategory={activeCategory}
        {...data}
      />
      <div className={s.root}>
        <div className={s.inner}>
          <div className={s.pageHead}>
            <h1 className={cx(s.pageTitle, s.headItem)}>Blog</h1>
            <h2 className={cx(s.pageDescription, s.headItem)}>
              Stay in touch with our products development and explore
              zero-knowledge technology
            </h2>
            {isMobile && (
              <div className={s.mobileSortButtons}>
                <div className={s.scrollWrapper}>
                  <div className={s.buttonsWrapper}>
                    <Button
                      cbData="All"
                      onClick={onCategoryClick}
                      className={cx(s.filterButtons, {
                        [s.activeButton]: activeCategory === 'All',
                      })}
                    >
                      All
                    </Button>
                    {data.categories.map(button => (
                      <Button
                        key={button.id}
                        cbData={button.name}
                        onClick={onCategoryClick}
                        className={cx(s.filterButtons, {
                          [s.activeButton]: activeCategory === button.name,
                        })}
                      >
                        {button.name}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className={s.scrollWrapper}>
                  <div className={s.tags}>
                    {data.tags.map(tag => (
                      <TagButton
                        className={cx({
                          [s.activeTag]: activeTag === tag.name,
                        })}
                        key={tag.id}
                        tag={tag.name}
                        onClick={onTagClick}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className={cx(s.content, s.centeredItems)}>
            {currentBlogs && currentBlogs.length > 0 ? (
              currentBlogs.map(post => (
                <PostCard
                  key={post.id}
                  className={s.blogPost}
                  linkTo={`/blog/post/${post.slug}`}
                  content={post}
                />
              ))
            ) : (
              <ArticlesNotFound title="Articles not found" />
            )}
          </div>
        </div>
      </div>
      <FooterAnimationSection
        linkText={hasMoreBlogs ? 'Load more' : ''}
        onLinkClick={handleLoadMore}
        className={s.footerSection}
      />
    </Container>
  );
};

BlogsPage.propTypes = {
  data: shape({
    posts: arrayOf(
      shape({
        id: number,
        category: shape({
          id: number,
          name: string,
          slug: string,
          creataAt: string,
          publishedAt: string,
          updatedAt: string,
        }),
        date: string,
        description: string,
        slug: string,
        author: string,
        title: string,
        isFeature: bool,
        tags: arrayOf(
          shape({
            id: number,
            name: string,
            slug: string,
            creataAt: string,
            publishedAt: string,
            updatedAt: string,
          })
        ),
      })
    ),
    tags: arrayOf(
      shape({
        id: number,
        name: string,
        slug: string,
        creataAt: string,
        publishedAt: string,
        updatedAt: string,
      })
    ),
    category: shape({
      id: number,
      name: string,
      slug: string,
      creataAt: string,
      publishedAt: string,
      updatedAt: string,
    }),
  }),
};

export default BlogsPage;

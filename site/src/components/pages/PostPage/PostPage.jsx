import cx from 'classnames';
import { arrayOf, number, shape, string } from 'prop-types';
import { useRouter } from 'next/router';

import { useViewport } from 'hooks/useViewport';

import Container from 'components/Container';
import PostCard from 'components/PostCard';
import Icon from 'components/Icon';
import SocialButton from 'components/SocialButton';
import Button from 'components/Button';
import TagButton from 'components/TagButton';
import JoinNil from 'pages/Home/JoinNil';
import WhiteRectangle from 'components/WhiteRectangle';

import SideNavigation from 'components/SideNavigation';
import FooterAnimationSection from 'components/FooterAnimationSection';
import LastSection from 'components/LastSection';
import s from './PostPage.module.scss';

const ArrowButton = ({ className }) => (
  <Button
    href="/blog"
    className={cx(s.centerItems, className)}
  >
    <Icon
      name="arrow-up"
      className={s.arrow}
    />
    <p className={s.paragraph}>Blog</p>
  </Button>
);

const PostPage = ({ post, recommendedPosts, content }) => {
  const router = useRouter();
  const { isMobile } = useViewport();

  const stubSocialLinks = [
    {
      icon: 'linkedin',
      link: `https://www.linkedin.com/shareArticle?mini=true&url=${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}&title=${post.title}`,
    },
    {
      icon: 'telegram',
      link: `https://t.me/share/url?url=${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}`,
    },
    {
      icon: 'twitter',
      link: `https://twitter.com/intent/tweet?text=${post.title} ${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}`,
    },
  ];

  return (
    <Container className={s.container}>
      <SideNavigation
        className={s.sideNavigation}
        title={<ArrowButton />}
        titleAnimation={false}
      >
        <div className={s.social}>
          <p className={s.paragraph}>Share this post</p>
          <div className={s.info}>
            {stubSocialLinks.map(item => (
              <SocialButton
                className={s.socialLink}
                key={item.icon}
                href={item.link}
                icon={item.icon}
              />
            ))}
          </div>
        </div>
      </SideNavigation>
      <div className={s.root}>
        <div className={s.content}>
          <div className={cx(s.head, s.marginBlock)}>
            <div className={cx(s.centerItems, s.marginBlock, s.mobileHead)}>
              <ArrowButton className={s.mobileArrowButton} />
              <div className={cx(s.centerItems, s.types)}>
                {post.category && (
                  <p className={s.type}>{post.category.name}</p>
                )}
                <div className={s.tagsWrapper}>
                  {post.tags.map(tag => (
                    <TagButton
                      key={tag.id}
                      className={s.tag}
                      tag={tag.name}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className={cx(s.content, s.wrapper)}>
              <h1 className={cx(s.title, s.blogTitle, s.marginBlock)}>
                {post.title}
              </h1>
              {post.subtitle && (
                <h2 className={cx(s.subtitle, s.marginBlock)}>
                  {post.description}
                </h2>
              )}
              {isMobile && (
                <div className={s.social}>
                  <p className={s.paragraph}>Share this post</p>
                  <div className={s.info}>
                    {stubSocialLinks.map(item => (
                      <SocialButton
                        className={s.socialLink}
                        key={item.icon}
                        href={item.link}
                        icon={item.icon}
                      />
                    ))}
                  </div>
                </div>
              )}
              {!isMobile && (
                <div className={s.info}>
                  <p className={cx(s.author, s.paragraph)}>{post.author}</p>
                  <p className={cx(s.date, s.paragraph)}>{post.date}</p>
                </div>
              )}
            </div>
          </div>
          <div
            className={cx(s.main, s.content)}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div className={s.moreSection}>
            <WhiteRectangle className={s.whiteRecatngle} />
            <JoinNil
              data={content.joinNil}
              className={s.joinSection}
            />
            <WhiteRectangle />
            <div className={s.moreBlogsWrapper}>
              <h1 className={cx(s.title, s.otherBlogsTitle)}>
                Read other articles
              </h1>
              {recommendedPosts.map(item => (
                <PostCard
                  linkTo={`/blog/post/${item.slug}`}
                  key={item.id}
                  className={s.blog}
                  isBlogPost
                  content={{ ...item, isFeature: false }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={s.lastSection}>
        <div className={s.lastSectionWrapper}>
          <WhiteRectangle />
          <LastSection withBackground />
        </div>
      </div>
      <FooterAnimationSection className={s.footerSection} />
    </Container>
  );
};

PostPage.propTypes = {
  post: shape({
    id: number,
    category: shape({
      id: number,
      name: string,
      slug: string,
      creataAt: string,
      publishedAt: string,
      updatedAt: string,
    }),
    content: string,
    date: string,
    description: string,
    slug: string,
    author: string,
    title: string,
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
  }),
  recommendedPosts: arrayOf(
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
  content: shape({
    joinNil: shape({
      content: shape({
        left: string,
        right: string,
      }),
      social: string,
      title: string,
    }),
  }),
};

export default PostPage;

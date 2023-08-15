import React from 'react';
import s from './ResearchLayout.module.scss';
import { arrayOf, node } from 'prop-types';
import Container from 'components/Container';
import SideNavigation from 'components/SideNavigation';
import FooterAnimationSection from 'components/FooterAnimationSection';
import LastSection from 'components/LastSection';
import WhiteRectangle from 'components/WhiteRectangle';
import { Tag } from 'entities/tag';
import TagList from './TagList';
import { useRouter } from 'next/router';

const ResearchLayout = ({ children, tags }) => {
  const router = useRouter();

  const activeTagSlug = router.query?.slug ?? '';

  const onTagClickHandler = async tagItem => {
    if (tagItem.slug === activeTagSlug) {
      await router.push(`/research`);
      return;
    }

    await router.push(`/research/tag/${tagItem.slug}`);
  };

  return (
    <Container className={s.container}>
      <SideNavigation
        title="Research"
        className={s.sideNavigation}
        titleAnimation={false}
      >
        <TagList
          tags={tags}
          activeTagSlug={activeTagSlug}
          onTagClick={onTagClickHandler}
        />
      </SideNavigation>
      <div className={s.wrapper}>
        <div className={s.contentWrapper}>
          <section className={s.titleWrapper}>
            <h1 className={s.title}>Research</h1>
            <p className={s.description}>
              Our team’s latest work on trustless cloud data management,
              non-interactive zero-knowledge proofs, decentralized cryptography,
              and more.
            </p>
          </section>
          <section className={s.tagsWrapper}>
            <TagList
              tags={tags}
              activeTagSlug={activeTagSlug}
              onTagClick={onTagClickHandler}
            />
          </section>
          {children}
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

ResearchLayout.propTypes = {
  children: node,
  tags: arrayOf(Tag),
};

export default ResearchLayout;

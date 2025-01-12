import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import AnimatedDottedContainer from 'components/AnimatedDottedContainer';
import classNames from 'classnames';
import SideNavigation from 'components/SideNavigation';
import { useViewport } from 'hooks/useViewport';
import { gsap } from 'gsap';
import { useScroll } from 'hooks/useScroll';
import s from './IntroAnimation.module.scss';

const IntroAnimation = ({
  items,
  navigationTitle,
  navigationLinkText,
  navigationLink,
  children,
  animatedContainerClassName,
  className,
  ...props
}) => {
  const sideNavigationRef = useRef(null);
  const [isVisible, setVisible] = useState(false);
  const [isChildrenVisible, setChildrenVisible] = useState(false);
  const [timelineInstance, setTimelineInstance] = useState(null);
  const { isMobile } = useViewport();
  const { disableScroll, enableScroll, scrollToTop } = useScroll();

  useEffect(() => {
    scrollToTop().then(disableScroll);
    setTimeout(() => {
      setVisible(true);
    }, 700);

    return () => {
      enableScroll();
    };
  }, []);

  useEffect(() => {
    const sideNavigation = sideNavigationRef.current;

    if (!sideNavigation || isMobile === false || !isVisible) {
      return;
    }

    const timeline = gsap.timeline({
      repeat: 0,
      delay: 1,
      defaults: { duration: 1.2 },
    });
    timeline.paused();

    const navigationTimeline = gsap.timeline({
      repeat: 0,
      delay: 1,
      defaults: { duration: 1.2 },
    });

    navigationTimeline.to(sideNavigation, {
      scale: '0.52',
      ease: 'expo.out',
    });

    setTimeout(() => {
      setChildrenVisible(true);
    }, 1400);
    setTimelineInstance(timeline);

    return () => {
      if (timeline) {
        timeline?.kill?.();
      }
      if (navigationTimeline) {
        navigationTimeline?.kill?.();
      }
    };
  }, [isMobile, isVisible, sideNavigationRef]);

  return (
    <div
      {...props}
      className={classNames(s.container, className)}
    >
      <div
        className={s.sideNavigationMobile}
        ref={sideNavigationRef}
      >
        <SideNavigation
          title={navigationTitle}
          linkText={navigationLinkText}
          link={navigationLink}
          isVisible={isVisible}
          titleLarge
        />
      </div>
      <SideNavigation
        className={s.sideNavigation}
        title={navigationTitle}
        linkText={navigationLinkText}
        link={navigationLink}
        isVisible={isVisible}
        titleLarge
      />
      <div className={s.wrapper}>
        <AnimatedDottedContainer
          className={classNames(
            s.animatedContainer,
            animatedContainerClassName
          )}
          onInitialAnimationComplete={enableScroll}
          items={items}
          isVisible={isVisible}
          timeline={isMobile ? timelineInstance : undefined}
          scrollTriggerProps={{
            start: 'top top',
            end: `bottom bottom`,
          }}
        />
      </div>
      {typeof children === 'function'
        ? children(isMobile ? isChildrenVisible : isVisible)
        : children}
    </div>
  );
};

IntroAnimation.propTypes = {
  items: PropTypes.array.isRequired,
  navigationTitle: PropTypes.string.isRequired,
  navigationLinkText: PropTypes.string,
  navigationLink: PropTypes.string,
  children: PropTypes.any,
  animatedContainerClassName: PropTypes.string,
  className: PropTypes.string,
};

export default IntroAnimation;

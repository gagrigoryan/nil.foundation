import cx from 'classnames';

import { useViewport } from 'hooks/useViewport';

import Container from 'components/Container';
import StickyContainer from 'components/StickyContainer';
import WhiteRectangle from 'components/WhiteRectangle';
import Button from 'components/Button';
import Icon from 'components/Icon';

import s from './Error.module.scss';

const NotFound = () => {
  const { isMobile } = useViewport();

  return (
    <Container className={s.root}>
      {!isMobile && (
        <StickyContainer className={s.navigation}>
          <Button
            href="/"
            className={s.backButton}
          >
            <Icon
              name="arrow-up"
              className={s.arrow}
            />
            <p className={s.paragraph}>Home</p>
          </Button>
        </StickyContainer>
      )}
      <div className={s.content}>
        <div className={s.background}>
          <div className={s.wrapper}>
            {isMobile && (
              <Button
                href="/"
                className={s.backButton}
              >
                <Icon
                  name="arrow-up"
                  className={s.arrow}
                />
                <p className={s.paragraph}>Home</p>
              </Button>
            )}
            <div className={s.main}>
              <h1 className={s.title}>500</h1>
              <div className={s.footer}>
                <WhiteRectangle />
                <div>
                  <p className={s.text}>Something went wrong, try again later</p>
                  <WhiteRectangle />
                </div>
              </div>
            </div>
            {!isMobile && (
              <div className={s.wrapper}>
                <div className={cx(s.box, s.box1)}>
                  <WhiteRectangle />
                </div>
                <div className={cx(s.box, s.box2)}>
                  <WhiteRectangle />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default NotFound;

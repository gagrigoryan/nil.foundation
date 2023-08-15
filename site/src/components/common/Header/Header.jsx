import { useCallback, useEffect, useMemo, useState } from 'react';
import { string } from 'prop-types';
import cx from 'classnames';
import { useRouter } from 'next/router';

import { useViewport } from 'hooks/useViewport';

import Icon from 'components/Icon';
import Container from 'components/Container';
import Button from 'components/Button';

import BurgerMenu from './BurgerMenu';

import s from './Header.module.scss';
import { links } from './stub';

const Header = ({ className, config }) => {
  const router = useRouter();
  const { isMobile } = useViewport();

  const [isBurgerOpen, setBurgerOpen] = useState(false);

  const realLinks = useMemo(() => {
    if (config.isGlossaryOn) {
      return {
        ...links,
        other: [...links.other, { name: 'Glossary', link: '/glossary' },],
      }
    }
    return links;
  }, [config]);


  useEffect(() => {
    setBurgerOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  useEffect(() => {
    if (isBurgerOpen) {
      document.body.classList.add(s.hidden);
    } else {
      document.body.classList.remove(s.hidden);
    }
  }, [isBurgerOpen]);

  const handleClickBurger = useCallback(() => {
    setBurgerOpen(!isBurgerOpen);
  }, [isBurgerOpen]);

  return (
    <Container className={cx(s.root, className)}>
      <nav className={s.wrapper}>
        <Button href="/">
          <Icon
            name="logo"
            className={s.logo}
          />
        </Button>
        {realLinks.main.map(el => (
          <Button
            key={el.name}
            className={cx(s.btn, {
              [s.isActive]: router.asPath === el.link,
            })}
            href={el.link}
          >
            <div className={s.square} />
            {el.name}
          </Button>
        ))}
        <div className={s.box}>
          {realLinks.other.map(el => (
            <Button
              key={el.name}
              href={el.link}
              className={cx(s.otherLink, {
                [s.isActive]: router.asPath === el.link,
              })}
            >
              {el.name}
            </Button>
          ))}
        </div>
        {isMobile && (
          <>
            <div
              className={s.buttonsWrapper}
              onClick={handleClickBurger}
            >
              <Icon
                className={cx(s.burgerBtn, {
                  [s.isBurgerOpen]: isBurgerOpen,
                })}
                name="cross"
              />
              <Icon
                className={cx(s.burgerBtn, {
                  [s.isBurgerOpen]: !isBurgerOpen,
                })}
                name="squares"
              />
            </div>
            <BurgerMenu
              isOpen={isBurgerOpen}
              onClose={handleClickBurger}
            />
          </>
        )}
      </nav>
    </Container>
  );
};

Header.propTypes = {
  className: string,
};

export default Header;

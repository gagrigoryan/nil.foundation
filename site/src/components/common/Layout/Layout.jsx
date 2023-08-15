import { any, bool } from 'prop-types';

import Header from 'components/Header';
import Footer from 'components/Footer';
import Script from 'next/script'


import s from './Layout.module.scss';

const Layout = ({ children, withFooter, config }) => (
  <>
    <Script src="https://www.googletagmanager.com/gtag/js?id=G-CB8D65YWRZ" />
    <Script id="google-analytics">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-CB8D65YWRZ');
      `}
    </Script>
    <Header config={config} />
    <div className={s.wrapper}>{children}</div>
    {withFooter && <Footer />}
  </>
);

Layout.propTypes = {
  children: any,
  withFooter: bool,
};

Layout.defaultProps = {
  withFooter: true,
};

export default Layout;

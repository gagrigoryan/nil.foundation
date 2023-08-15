import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import 'styles/reset.scss';
import 'styles/globals.scss';

import 'utils/gsapRegister';

import Layout from 'components/Layout';

import useCalcVh from 'hooks/useCalcVh';

import { seo } from 'constants/seo';
import Hotjar from '@hotjar/browser';

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  useCalcVh();

  // using hotjar analytics. currently it's on
  useEffect(() => {
    const siteId = 3596146;
    const hotjarVersion = 6;

    Hotjar.init(siteId, hotjarVersion);
  }, []);

  useEffect(() => {
    const handleRouteChange = url => {
      if (url === '/careers/jobs') {
        router.reload();
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  const getLayout = Component.getLayout || (page => page);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta
          name="description"
          content={seo.description}
          key="description"
        />
        {/* TODO: add current keywords */}
        <meta
          name="keywords"
          content=""
        />
        <meta
          name="theme-color"
          content={seo.theme}
        />
        <meta
          property="og:title"
          content={seo.title}
          key="og:title"
        />
        <meta
          property="og:type"
          content="website"
        />
        <meta
          property="og:description"
          content={seo.description}
          key="og:description"
        />
        <meta
          property="og:url"
          content={`${seo.url}${router.asPath}`}
          key="og:url"
        />
        <meta
          property="og:image"
          content={`${seo.url}${seo.image}`}
          key="og:image"
        />
        {/* TODO: add current creator */}
        <meta
          name="twitter:creator"
          content="@nil"
        />
        <meta
          name="twitter:card"
          content="summary_large_image"
        />
        <meta
          property="twitter:domain"
          content={seo.url || ''}
        />
        <meta
          property="twitter:url"
          content={`${seo.url}${router.asPath}`}
          key="twitter:url"
        />
        <meta
          name="twitter:title"
          content={seo.title}
          key="twitter:title"
        />
        <meta
          name="twitter:description"
          content={seo.description}
          key="twitter:description"
        />
        <meta
          name="twitter:image"
          content={`${seo.url}${seo.image}`}
          key="twitter:image"
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}`}
          key="canonical"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <Layout
        withFooter={router.pathname !== '/404'}
        config={pageProps.config}
      >
        {getLayout(<Component {...pageProps} />)}
      </Layout>
    </>
  );
};

export default MyApp;

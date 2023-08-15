import NotFound from 'pages/NotFound';
import { getSiteConfig } from 'src/strapi';

const NotFoundPage = () => <NotFound />;

export async function getStaticProps() {
    const config = await getSiteConfig();
    return {
        props: { config },
    };
}


export default NotFoundPage;

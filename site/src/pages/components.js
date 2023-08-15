import UI from 'pages/ComponentsUi';
import { getSiteConfig } from 'src/strapi';

const UIPage = () => <UI />;

export async function getStaticProps() {
    const config = await getSiteConfig();
    return {
        props: { config },
    };
}

export default UIPage;

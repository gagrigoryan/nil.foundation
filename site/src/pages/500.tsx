import React from "react";
import { getSiteConfig } from '../strapi/getSiteConfig';
import Error from "pages/Error";

const ErrorPage = () => <Error />;


export async function getStaticProps() {
    const config = await getSiteConfig();
    return {
        props: {
            config,
        }
    }
}

export default ErrorPage;

    
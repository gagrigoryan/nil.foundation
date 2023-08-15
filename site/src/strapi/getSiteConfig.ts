import { client } from './client';

type SiteConfig = {
  isGlossaryOn: boolean;
  isReserachTagsOn: boolean;
};

const defaultConfig = {
  isGlossaryOn: false,
  isReserachTagsOn: false,
}

export const getSiteConfig = async (): Promise<SiteConfig> => {
  try { 
    const res = await client.get<{data?: {attributes: SiteConfig}}>('/config');
    if (!res?.data?.data?.attributes) throw new Error('No config found');
    return res.data.data.attributes;
  } catch (e) {
    console.error(e);
    return defaultConfig;
  }
};


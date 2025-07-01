export const APP_CONFIG = {
    name: 'Developer Portal',
    description: 'Build amazing things with our APIs and tools',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    api: {
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
        timeout: 10000
    },
    theme: {
        defaultMode: 'light' as const
    }
};

export const ROUTES = {
    HOME: '/',
    DOCS: '/docs',
    API: '/api',
    RECORDINGS: '/recordings',
    SUPPORT: '/support'
};

export const FILE_UPLOAD_CONFIG = {
    mvns: {
        mvns: 1,
        bvs: 0,
        dgc: 0
    },
    bvs: {
        mvns: 0,
        bvs: 1,
        dgc: 0
    },
    dgc: {
        mvns: 0,
        bvs: 0,
        dgc: 1
    },
    mvnsV5: {
        mvns: 2,
        bvs: 0,
        dgc: 0
    },
    mvnsFullBandwidth: {
        mvns: 3,
        bvs: 0,
        dgc: 0,
        default_fullbandwidth: 0
    },
    cleanVoice: {
        mvns: 1,
        bvs: 1,
        dgc: 1
    }
};

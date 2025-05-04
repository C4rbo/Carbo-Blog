/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'Carbo Blog',
  author: 'Carbo',
  headerTitle: 'Carbo',
  description: 'Hi! I’m Carbo, Italian Software Developer and Cybersecurity enthusiast',
  language: 'en-us',
  theme: 'dark',
  siteUrl: 'https://carb0.vercel.app/',
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/logo.png`,
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/twitter-card.png`,
  github: 'https://github.com/C4rbo',
  linkedin: 'https://www.linkedin.com/in/alessio-carbonara-675a1a295/',
  discord: 'https://discord.com/users/315450580342538251',
  locale: 'en-US',
  stickyNav: false,
  analytics: {
    umamiAnalytics: {
      umamiWebsiteId: process.env.NEXT_UMAMI_ID, // e.g. 123e4567-e89b-12d3-a456-426614174000
    },
  },
  newsletter: {
    provider: 'buttondown',
  },
  comments: {
    provider: 'giscus', // supported providers: giscus, utterances, disqus
    giscusConfig: {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'pathname', // supported options: pathname, url, title
      reactions: '1', // Emoji reactions: 1 = enable / 0 = disable
      metadata: '0',
      theme: 'light',
      darkTheme: 'transparent_dark',

      themeURL: '',
      lang: 'en',
    },
  },
}

module.exports = siteMetadata

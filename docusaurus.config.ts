import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import redirectsPlugin from './redirects.config';

const baseUrl = '/cn';
const isDocsArchive = process.env.IS_DOCS_ARCHIVE === 'true';

const archiveDocsThemeConfig = {
  announcementBar: {
    id: 'docs-archive',
    content:
      'This documentation is for an older version of JHipster. Click <a href="https://jhipster.tech/">here</a> for the current version of the documentation.',
    isCloseable: false,
  },
} satisfies Preset.ThemeConfig;

const config: Config = {
  noIndex: isDocsArchive,

  title: 'JHipster 中文网',
  favicon: 'images/favicon.ico',

  // Set the production url of your site here
  url: 'https://www.jhipster.tech',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl,

  // GitHub pages deployment config.
  deploymentBranch: 'gh-pages',
  organizationName: 'jhipster',
  projectName: 'jhipster.github.io',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  onBrokenAnchors: 'ignore',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans', 'en', 'jp'],
    localeConfigs: {
      'zh-Hans': {
        label: '中文',
        htmlLang: 'zh-CN',
        path: 'https://www.jhipster.tech/cn',
      },
      en: {
        label: 'English',
        htmlLang: 'en-US',
        path: 'https://www.jhipster.tech',
      },
      jp: {
        label: '日本語',        
        path: 'https://www.jhipster.tech/jp',
      },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/jhipster/jhipster.github.io/tree/main/',
          routeBasePath: '/',
          showLastUpdateTime: true,
          versions: {
            current: {
              path: '/',
            },
          },
          onlyIncludeVersions: ['current'],
        },
        blog: false,
        theme: {
          customCss: './src/scss/custom.scss',
        },
        sitemap: {
          changefreq: 'daily',
          lastmod: 'datetime',
          ignorePatterns: ['/modules/marketplace/details/\\*', '/search'],
        },
        gtag: {
          trackingID: 'G-4L9RJVPGJT',
          anonymizeIP: true,
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    'docusaurus-plugin-sass',
    redirectsPlugin,
    './src/plugins/google-fonts.ts',
    './src/plugins/module-details.ts',
    'plugin-image-zoom',
  ],

  themeConfig: {
    metadata: [
      { name: 'author', content: 'JHipster Team' },
      { name: 'twitter:site', content: '@jhipster' },
      {
        name: 'google-site-verification',
        content: 'JSA7VC5gSwD5KKbXlxK8F9rXJtC91rKJq0aWhfpBC0k',
      },
    ],
    image: 'images/twitter-card.png',
    navbar: {
      logo: {
        alt: 'JHipster Logo',
        src: 'images/logo/logo-light.svg',
        srcDark: 'images/logo/logo-dark.svg',
        width: 140,
        height: 32,
      },
      items: [
        // {
        //   type: 'docSidebar',
        //   sidebarId: 'docsSidebar',
        //   position: 'right',
        //   label: 'Docs',
        // },
        {
          to: '/getting-started',
          label: '文档',
          position: 'right',
        },
        {
          to: '/modules/marketplace/',
          label: '应用市场',
          position: 'right',
        },
        {
          to: '/team/',
          label: '团队',
          position: 'right',
        },
        {
          to: '/sponsors/',
          label: '赞助商',
          position: 'right',
        },
        {
          href: 'https://start.jhipster.tech/jdl-studio/',
          label: 'JDL 工作室',
          position: 'right',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },        
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['java', 'bash', 'yaml', 'gradle', 'diff'],
    },
    algolia: {
      appId: 'T3OWTRXITU',
      apiKey: '012c1b755b9e42f5e300959da6ad25cd',
      indexName: 'jhipster',
      // Temporary disabled, need setup https://docusaurus.io/docs/search#algolia-troubleshooting
      contextualSearch: false,
    },
    imageZoom: {
      // CSS selector to apply the plugin to, defaults to '.markdown img'
      // exclude images from zoom with "italicized" markdown, e.g., _![](/img/portal/new.png)_
      selector: '.markdown :not(em) > img',
    },
    ...(isDocsArchive ? archiveDocsThemeConfig : {}),
  } satisfies Preset.ThemeConfig,

  headTags: [
    // JSON+LD
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org/',
        '@type': 'Organization',
        name: 'JHipster',
        url: 'https://www.jhipster.tech',
        logo: 'https://www.jhipster.tech/images/logo/logo.svg',
        sameAs: [
          'https://x.com/jhipster',
          'https://github.com/jhipster/generator-jhipster',
        ],
      }),
    },
  ],
};

export default config;

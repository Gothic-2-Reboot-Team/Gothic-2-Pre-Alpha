import security from '@comark/nuxt/plugins/security';

// Changelog entries are text/Markdown, never HTML or executable components.
export const changelogMarkdownOptions = {
  registerDefaultPlugins: false,
};

export const changelogMarkdownPlugins = [
  security({
    allowedTags: [
      'p',
      'br',
      'hr',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'ul',
      'ol',
      'li',
      'blockquote',
      'strong',
      'em',
      's',
      'del',
      'code',
      'pre',
      'a',
      'img',
      'table',
      'thead',
      'tbody',
      'tr',
      'th',
      'td',
    ],
    allowedProtocols: ['https', 'http', 'mailto'],
    allowDataImages: false,
  }),
];

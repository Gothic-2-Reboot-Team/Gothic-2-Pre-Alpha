export const useChangelog = () => {
  const { parseChangelogTxt } = useChangelogParser();
  const baseURL = useRuntimeConfig().app.baseURL.replace(/\/$/, '');

  return useFetch(`${baseURL}/changelog.txt`, {
    key: 'changelog',
    responseType: 'text',
    server: false,
    lazy: true,
    timeout: 10_000,
    retry: 0,
    default: () => [],
    transform: (text: string) => {
      const releases = parseChangelogTxt(text);
      if (!releases.length) {
        throw new Error('The changelog does not contain any valid releases.');
      }
      return releases;
    },
  });
};

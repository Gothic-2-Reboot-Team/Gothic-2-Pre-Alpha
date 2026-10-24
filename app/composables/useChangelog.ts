const changelogFiles = import.meta.glob<string>('../../public/changelog.txt', {
  query: '?raw',
  import: 'default',
  eager: true,
});

export const useChangelog = () => {
  const { parseChangelogTxt } = useChangelogParser();

  return useAsyncData(
    'changelog',
    async () => {
      const changelog = changelogFiles['../../public/changelog.txt'];
      if (changelog === undefined) {
        throw new Error('The changelog file is not available.');
      }
      const releases = parseChangelogTxt(changelog);
      if (!releases.length) {
        throw new Error('The changelog does not contain any valid releases.');
      }
      return releases;
    },
    { default: () => [] },
  );
};

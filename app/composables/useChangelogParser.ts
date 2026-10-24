import type { Release } from '../types';

export const useChangelogParser = () => {
  const parseChangelogTxt = (text: string): Release[] => {
    const releasesByTag = new Map<string, Release>();
    let release: Release | undefined;
    let category = '';
    let items: string[] = [];
    let sections: string[] = [];

    const finishCategory = () => {
      if (category && items.length) {
        sections.push(`## ${category}\n\n${items.join('\n')}`);
      }
      category = '';
      items = [];
    };

    const finishRelease = () => {
      finishCategory();
      if (release && sections.length) {
        release.markdown = sections.join('\n\n');
        const existing = releasesByTag.get(release.tag);
        if (existing) {
          existing.markdown += `\n\n${release.markdown}`;
        } else {
          releasesByTag.set(release.tag, release);
        }
      }
      release = undefined;
      sections = [];
    };

    for (const line of text.replace(/^\uFEFF/, '').split(/\r\n?|\n/)) {
      const trimmed = line.trim();
      const dateMatch = trimmed.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);

      if (dateMatch) {
        finishRelease();
        const day = dateMatch[1]!.padStart(2, '0');
        const month = dateMatch[2]!.padStart(2, '0');
        const year = dateMatch[3]!;
        const date = new Date(`${year}-${month}-${day}T00:00:00Z`);

        if (
          Number(year) < 1 ||
          !Number.isFinite(date.getTime()) ||
          date.getUTCFullYear() !== Number(year) ||
          date.getUTCMonth() + 1 !== Number(month) ||
          date.getUTCDate() !== Number(day)
        ) {
          continue;
        }

        release = {
          tag: `v${year}.${month}.${day}`,
          title: `${day}.${month}.${year}`,
          date: date.toISOString(),
          markdown: '',
          isLatest: false,
        };
        continue;
      }

      if (!release || !trimmed || /^[-\s]+$/.test(trimmed)) continue;

      const categoryMatch = trimmed.match(
        /^([\p{L}\p{N}][\p{L}\p{N} _/-]*):\s*(.*)$/u,
      );
      if (categoryMatch) {
        finishCategory();
        category = categoryMatch[1]!;
      }

      const item = (categoryMatch?.[2] ?? trimmed).match(/^-\s+(.+)$/);
      if (category && item) items.push(`- ${item[1]!.trim()}`);
    }

    finishRelease();
    const releases = [...releasesByTag.values()].sort((a, b) =>
      b.date.localeCompare(a.date),
    );
    if (releases[0]) releases[0].isLatest = true;
    return releases;
  };

  return { parseChangelogTxt };
};

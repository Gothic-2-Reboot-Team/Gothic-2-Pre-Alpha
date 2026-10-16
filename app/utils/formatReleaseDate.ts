const relativeFormatter = new Intl.RelativeTimeFormat('en', {
  numeric: 'auto',
});
const dateFormatter = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'medium',
  timeZone: 'UTC',
});

export const formatReleaseDate = (dateString: string): string => {
  const date = new Date(dateString);
  return Number.isFinite(date.getTime())
    ? dateFormatter.format(date)
    : 'Unknown date';
};

export const formatRelativeDate = (
  dateString: string,
  now: Date = new Date(),
): string => {
  const date = new Date(dateString);
  if (!Number.isFinite(date.getTime()) || !Number.isFinite(now.getTime())) {
    return 'Unknown date';
  }

  date.setUTCHours(0, 0, 0, 0);
  const today = new Date(now);
  today.setUTCHours(0, 0, 0, 0);
  const days = Math.round((date.getTime() - today.getTime()) / 86_400_000);
  const direction = Math.sign(days);
  const [start, end] = days < 0 ? [date, today] : [today, date];
  let months =
    (end.getUTCFullYear() - start.getUTCFullYear()) * 12 +
    end.getUTCMonth() -
    start.getUTCMonth();
  const lastDay = new Date(end.getTime());
  lastDay.setUTCMonth(end.getUTCMonth() + 1, 0);
  if (end.getUTCDate() < Math.min(start.getUTCDate(), lastDay.getUTCDate())) {
    months--;
  }

  const years = Math.floor(months / 12);
  const relative =
    years >= 1
      ? relativeFormatter.format(direction * years, 'year')
      : months >= 1
        ? relativeFormatter.format(direction * months, 'month')
        : relativeFormatter.format(days, 'day');

  return relative.charAt(0).toUpperCase() + relative.slice(1);
};

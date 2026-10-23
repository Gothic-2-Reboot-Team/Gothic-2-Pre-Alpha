<script setup lang="ts">
import {
  changelogMarkdownOptions,
  changelogMarkdownPlugins,
} from '../utils/changelogMarkdown';

const { data: versions, status, error, refresh } = await useChangelog();
const currentDate = useState('changelog-current-date', () =>
  new Date().toISOString(),
);
let clock: ReturnType<typeof setInterval> | undefined;

onMounted(() => {
  const updateDate = () => {
    currentDate.value = new Date().toISOString();
  };
  updateDate();
  clock = setInterval(updateDate, 60_000);
});
onUnmounted(() => {
  if (clock) clearInterval(clock);
});
</script>

<template>
  <main
    v-if="status === 'pending' || status === 'idle'"
    role="status"
    aria-live="polite"
    class="py-16 text-center font-mono text-sm"
  >
    Loading changelog...
  </main>
  <main v-else-if="error" class="py-16 text-center font-mono text-sm">
    <p role="alert" class="mb-4">
      Could not load the changelog. Please try again.
    </p>
    <UButton label="Try again" variant="outline" @click="refresh()" />
  </main>
  <UChangelogVersions
    v-else
    as="main"
    :indicator-motion="false"
    :ui="{
      root: 'py-16 sm:py-24 lg:py-32',
      indicator: 'inset-y-0',
    }"
  >
    <UChangelogVersion
      v-for="version in versions"
      :key="version.tag"
      :title="version.title"
      :date="version.date"
      :ui="{
        root: 'flex items-start',
        container: 'max-w-xl',
        header: 'border-b border-gray-800 pb-4 mb-4',
        title: 'text-2xl text-amber-100 font-mono font-semibold',
        date: 'text-xs font-mono',
        indicator:
          'sticky top-0 pt-16 -mt-16 sm:pt-24 sm:-mt-24 lg:pt-32 lg:-mt-32',
      }"
    >
      <template #header>
        <div class="flex-1">
          <div class="flex items-center gap-2">
            <h3 class="text-2xl text-amber-100 font-mono font-semibold">
              {{ version.title }}
            </h3>
            <div
              v-if="version.isLatest"
              class="ml-2 px-2 py-1 font-mono text-xs tracking-wider text-amber-100"
            >
              [ LATEST ]
            </div>
          </div>
          <time
            :datetime="version.date"
            class="text-xs font-mono mt-2 block changelog-date"
          >
            {{ formatRelativeDate(version.date, new Date(currentDate)) }} •
            {{ formatReleaseDate(version.date) }}
          </time>
        </div>
      </template>

      <template #body>
        <div class="changelog-markdown text-sm max-w-none">
          <Markdown
            v-if="version.markdown"
            :value="version.markdown"
            :options="changelogMarkdownOptions"
            :plugins="changelogMarkdownPlugins"
          />
        </div>
      </template>
    </UChangelogVersion>
  </UChangelogVersions>
</template>

<style scoped>
.changelog-markdown {
  color: var(--color-text);
}

.changelog-markdown :deep(h2),
.changelog-markdown :deep(strong) {
  color: var(--color-secondary);
}

.changelog-markdown :deep(a) {
  color: var(--color-link);
}

.changelog-markdown :deep(li::marker) {
  color: var(--color-text-muted);
}

:deep(code) {
  background-color: var(--color-bg-elevated);
  color: var(--color-link);
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
}

:deep(pre) {
  background-color: var(--color-bg-dark) !important;
  border: 1px solid var(--color-border);
}

:deep(pre code) {
  background-color: transparent;
  padding: 0;
}

.changelog-date {
  color: var(--color-secondary);
}
</style>

<script setup lang="ts">
interface Release {
  tag: string
  title: string
  date: string
  markdown: string
  isLatest: boolean
}

const parseChangelogTxt = (text: string): Release[] => {
  const releases: Release[] = []
  // Split by long separator lines (dash-space pattern repeated many times)
  const entries = text.split(/\n-[\s-]{20,}\n/).filter(e => e.trim())

  entries.forEach((entry, idx) => {
    const lines = entry.split('\n')
    if (lines.length === 0) return

    // Extract date from first non-empty line
    const dateLine = (lines[0] ?? '').trim()
    const dateMatch = dateLine.match(/(\d{1,2})\.(\d{1,2})\.(\d{4})/)

    if (!dateMatch) return

    const [, day, month, year] = dateMatch
    const date = new Date(`${year}-${month}-${day}T00:00:00Z`)
    const dateStr = date.toISOString()

    // Parse categories and items
    let markdown = ''
    let currentCategory = ''
    const categoryItems: string[] = []

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i] ?? ''

      // Skip dashes line and empty lines
      if (line.includes('-----------') || line.trim() === '') {
        continue
      }

      // Check if line contains category (tab + word + colon + tabs + optional first item)
      // Format: \tCategory:\t\t\t- First item or other items
      const categoryMatch = line.match(/^\t([A-Za-ząćęłńóśźż]+):\s*(.*)$/)

      if (categoryMatch && categoryMatch[1]) {
        // Save previous category if exists
        if (currentCategory && categoryItems.length > 0) {
          markdown += `## ${currentCategory}\n`
          categoryItems.forEach((item) => {
            markdown += `${item}\n`
          })
          categoryItems.length = 0
        }

        currentCategory = (categoryMatch[1] ?? '').trim()
        // Extract first item from category line if it has one
        const firstItem = (categoryMatch[2] ?? '').trim()
        // Look for dash pattern to detect if there's an item on this line
        const firstItemMatch = firstItem.match(/^-\s+(.+)/)
        if (firstItemMatch && firstItemMatch[1]) {
          const itemText = firstItemMatch[1].trim()
          if (itemText && itemText !== '') {
            categoryItems.push(`- ${itemText}`)
          }
        }
      } else if (line.trim().match(/^-\s+.+/) && currentCategory) {
        // This is an item line (starts with dash and space, possibly with leading tabs)
        const itemMatch = line.match(/^[\s\t]*-\s+(.+)$/)
        if (itemMatch && itemMatch[1]) {
          const itemText = itemMatch[1].trim()
          if (itemText && itemText !== '') {
            categoryItems.push(`- ${itemText}`)
          }
        }
      }
    }

    // Don't forget the last category
    if (currentCategory && categoryItems.length > 0) {
      markdown += `## ${currentCategory}\n`
      categoryItems.forEach((item) => {
        markdown += `${item}\n`
      })
    }

    releases.push({
      tag: `v${year}.${month}.${day}`,
      title: `${day}.${month}.${year}`,
      date: dateStr,
      markdown: markdown.trim(),
      isLatest: idx === 0,
    })
  })

  return releases
}

// Try to fetch from file, with embedded data as fallback
const getFallbackData = (): string => {
  return ''
}

let rawText = getFallbackData()

const loadChangelog = async () => {
  try {
    const response = await fetch('/changelog.txt')
    if (response.ok) {
      rawText = await response.text()
    }
  } catch (_e) {
    // Using fallback data
  }
}

await loadChangelog()

const versions = computed(() => {
  return parseChangelogTxt(rawText)
})

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 30) return `${days} days ago`

  const months = Math.floor(days / 30)
  if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`

  const years = Math.floor(days / 365)
  return `${years} year${years > 1 ? 's' : ''} ago`
}
</script>

<template>
  <UChangelogVersions
    as="main"
    :indicator-motion="false"
    :ui="{
      root: 'py-16 sm:py-24 lg:py-32',
      indicator: 'inset-y-0'
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
          'sticky top-0 pt-16 -mt-16 sm:pt-24 sm:-mt-24 lg:pt-32 lg:-mt-32'
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
          <time class="text-xs font-mono mt-2 block changelog-date">
            {{ formatDate(version.date) }} •
            {{
              new Date(version.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })
            }}
          </time>
        </div>
      </template>

      <template #body>
        <div class="prose prose-invert text-amber-50 text-sm max-w-none">
          <MDC
            v-if="version.markdown"
            :value="version.markdown"
          />
        </div>
      </template>
    </UChangelogVersion>
  </UChangelogVersions>
</template>

<style scoped>
:deep(.prose) {
  --tw-prose-body: var(--color-text);
  --tw-prose-headings: var(--color-secondary);
  --tw-prose-lead: var(--color-text);
  --tw-prose-links: var(--color-link);
  --tw-prose-bold: var(--color-secondary);
  --tw-prose-counters: var(--color-link);
  --tw-prose-bullets: var(--color-text-muted);
  --tw-prose-hr: var(--color-border);
  --tw-prose-quotes: var(--color-text-muted);
  --tw-prose-quote-borders: var(--color-border);
  --tw-prose-captions: var(--color-text-muted);
  --tw-prose-code: var(--color-link);
  --tw-prose-pre-code: var(--color-text);
  --tw-prose-pre-bg: var(--color-bg-elevated);
  --tw-prose-th-borders: var(--color-border);
  --tw-prose-td-borders: var(--color-border);
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

<script setup>
useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  htmlAttrs: {
    lang: 'en',
  },
});

useSeoMeta({
  title: 'Gothic 2 - Pre Alpha',
  description: 'Gothic 2 Pre-Release Material',
});

const isChangelogOpen = ref(false);

const toggleChangelog = () => {
  isChangelogOpen.value = !isChangelogOpen.value;
};

const navigationLinks = [
  {
    label: 'GitHub',
    icon: 'i-simple-icons-github',
    variant: 'ghost',
    size: 'md',
    to: 'https://github.com/Gothic-2-Reboot-Team/Gothic-2-Pre-Alpha',
    target: '_blank',
  },
  {
    label: 'Download',
    icon: 'i-lucide-download',
    variant: 'ghost',
    size: 'md',
    disabled: true,
    title: 'Download is not available yet',
    'aria-label': 'Download is not available yet',
  },
];
</script>

<template>
  <UApp>
    <div
      class="min-h-screen xl:h-screen xl:grid xl:grid-cols-2 relative transition-all duration-700 ease-in-out xl:overflow-hidden"
      :class="{
        'xl:!flex xl:items-center xl:justify-center': !isChangelogOpen,
      }"
    >
      <UPageSection
        title=""
        description=""
        orientation="vertical"
        :ui="{
          root: 'border-b border-gray-800 xl:border-b-0 xl:sticky xl:inset-y-0 xl:h-screen overflow-hidden transition-all duration-700 ease-in-out',
          container: 'h-full items-center justify-center',
          wrapper: 'flex flex-col',
          headline: 'mb-6',
          title:
            'text-center text-3xl font-mono text-amber-100 font-normal tracking-wider',
          description: 'text-center max-w-lg text-sm text-gray-600 font-mono',
          links: 'gap-1 justify-center -ms-2.5',
        }"
      >
        <template #headline>
          <AppLogo class="w-auto h-auto text-amber-100" />
        </template>

        <template #links>
          <UButton
            v-for="link in navigationLinks"
            :key="link.label"
            v-bind="link"
          />
          <UButton
            icon="i-lucide-scroll-text"
            label="Changelog"
            variant="ghost"
            size="md"
            :aria-expanded="isChangelogOpen"
            aria-controls="changelog-panel"
            @click="toggleChangelog"
          />
        </template>
      </UPageSection>

      <Transition
        enter-active-class="xl:transition-all xl:duration-500 xl:ease-out"
        enter-from-class="xl:translate-x-full xl:opacity-0"
        enter-to-class="xl:translate-x-0 xl:opacity-100"
        leave-active-class="xl:transition-all xl:duration-400 xl:ease-in"
        leave-from-class="xl:translate-x-0 xl:opacity-100"
        leave-to-class="xl:translate-x-full xl:opacity-0"
      >
        <section
          v-show="isChangelogOpen"
          id="changelog-panel"
          aria-label="Changelog"
          class="px-4 sm:px-6 py-8 xl:px-0 xl:py-0 xl:-ms-30 xl:flex-1 xl:sticky xl:inset-y-0 xl:h-screen xl:overflow-y-auto"
        >
          <NuxtPage />
        </section>
      </Transition>
    </div>
  </UApp>
</template>

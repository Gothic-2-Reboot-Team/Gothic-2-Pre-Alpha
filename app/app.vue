<script setup>
useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  htmlAttrs: {
    lang: 'en',
  },
})

useSeoMeta({
  title: 'Gothic 2 - Pre Alpha',
  description: 'Gothic 2 Pre-Release Material',
})

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
    to: '',
    target: '_blank',
  },
]
</script>

<template>
  <UApp>
    <div class="min-h-screen xl:grid xl:grid-cols-2">
      <UPageSection
        title=""
        description=""
        orientation="vertical"
        :links="navigationLinks"
        :ui="{
          root: 'border-b border-gray-800 xl:border-b-0 xl:sticky xl:inset-y-0 xl:h-screen overflow-hidden',
          container: 'h-full items-center justify-center',
          wrapper: 'flex flex-col',
          headline: 'mb-6',
          title:
            'text-center text-3xl font-mono text-amber-100 font-normal tracking-wider',
          description: 'text-center max-w-lg text-sm text-gray-600 font-mono',
          links: 'gap-1 justify-center -ms-2.5'
        }"
      >
        <template #headline>
          <AppLogo class="w-auto h-auto text-amber-100" />
        </template>

        <template #default />
      </UPageSection>

      <section class="px-4 sm:px-6 xl:px-0 xl:-ms-30 xl:flex-1">
        <NuxtPage />
      </section>
    </div>
  </UApp>
</template>

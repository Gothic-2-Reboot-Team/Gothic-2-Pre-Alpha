<template>
  <div class="logo-container">
    <img
      src="/g2-logo.webp"
      alt="Gothic II"
      class="logo-banner"
    />
    <div class="logo-subtitle">
      [ Pre Alpha ]
    </div>
  </div>
</template>

<style scoped>
.logo-container {
  text-align: center;
  font-family: 'Courier New', monospace;
  letter-spacing: 0.15em;
}

.logo-banner {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}

.logo-subtitle {
  font-size: 1rem;
  color: var(--color-text-muted);
  margin-top: 12px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}
</style>

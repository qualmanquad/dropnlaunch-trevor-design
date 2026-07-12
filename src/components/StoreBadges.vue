<script setup>
const appStoreUrl = 'https://apps.apple.com/us/app/drop-n-launch/id6740823976'
const playStoreUrl =
  'https://play.google.com/store/apps/details?id=com.haasnhammerstudios.dropnlaunch&pcampaignid=web_share'
</script>

<template>
  <div class="store-badges" aria-label="Download Drop N Launch">
    <a :href="appStoreUrl" target="_blank" rel="noreferrer">
      <img src="/assets/app-store.png" alt="Download on the App Store" width="148" height="44" />
    </a>
    <a :href="playStoreUrl" target="_blank" rel="noreferrer">
      <img src="/assets/google-play.png" alt="Get it on Google Play" width="148" height="44" />
    </a>
  </div>
</template>

<style scoped>
.store-badges {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
}

.store-badges a {
  display: block;
  transition: transform 180ms ease, opacity 180ms ease;
}

.store-badges a:hover {
  transform: translateY(-2px);
  opacity: 0.92;
}

.store-badges img {
  height: 2.75rem;
  width: auto;
}
</style>

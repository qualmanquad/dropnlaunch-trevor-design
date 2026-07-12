<script setup>
defineProps({
  label: {
    type: String,
    default: 'Image placeholder',
  },
  src: {
    type: String,
    default: '/assets/place-placeholder.svg',
  },
  alt: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <figure class="image-placeholder">
    <img :src="src" :alt="alt || label" />
    <figcaption v-if="label" class="sr-only">{{ label }}</figcaption>
  </figure>
</template>

<style scoped>
.image-placeholder {
  margin: 0;
  overflow: hidden;
  background: var(--green-soft);
}

.image-placeholder img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>

<script setup>
defineProps({
  html: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <section class="section legal-page">
    <div class="wrap legal-doc" v-html="html"></div>
  </section>
</template>

<style scoped>
.legal-page {
  padding-top: calc(var(--header-h) + 2.5rem);
  padding-bottom: 4rem;
  background: linear-gradient(180deg, var(--soft), var(--paper) 28%);
}

.legal-doc {
  max-width: 48rem;
  color: var(--ink);
}

.legal-doc :deep(h1) {
  font-family: var(--font-display);
  font-size: clamp(2.6rem, 7vw, 4rem);
  letter-spacing: 0.03em;
  line-height: 0.95;
  margin-bottom: 0.35rem;
}

.legal-doc :deep(h2) {
  font-family: var(--font-body);
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--muted);
  margin-bottom: 1.25rem;
}

.legal-doc :deep(h3) {
  font-family: var(--font-display);
  font-size: 1.55rem;
  letter-spacing: 0.03em;
  margin: 2rem 0 0.75rem;
}

.legal-doc :deep(p),
.legal-doc :deep(li) {
  color: var(--muted);
  font-size: 0.98rem;
  line-height: 1.65;
}

.legal-doc :deep(p + p) {
  margin-top: 0.9rem;
}

.legal-doc :deep(ul),
.legal-doc :deep(ol) {
  margin: 0.75rem 0 0;
  padding-left: 1.25rem;
}

.legal-doc :deep(li + li) {
  margin-top: 0.4rem;
}

.legal-doc :deep(strong) {
  color: var(--ink);
  font-weight: 700;
}

.legal-doc :deep(a) {
  color: var(--green-deep);
  text-decoration: underline;
  text-underline-offset: 2px;
}
</style>

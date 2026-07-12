<script setup>
import LegalDoc from '../components/LegalDoc.vue'
import privacyHtml from '../content/privacy-policy.html?raw'
</script>

<template>
  <LegalDoc :html="privacyHtml" />
</template>

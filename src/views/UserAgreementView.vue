<script setup>
import LegalDoc from '../components/LegalDoc.vue'
import userAgreementHtml from '../content/user-agreement.html?raw'
</script>

<template>
  <LegalDoc :html="userAgreementHtml" />
</template>

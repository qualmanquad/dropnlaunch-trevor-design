<script setup>
const topics = [
  {
    title: 'Email Support',
    copy:
      'Send questions or support requests to support@dropnlaunch.com.',
    href: 'mailto:support@dropnlaunch.com',
    linkLabel: 'support@dropnlaunch.com',
  },
  {
    title: 'Setup and Training',
    copy:
      'From Garmin R10 pairing to camera placement, we can walk you through your first session setup.',
  },
  {
    title: 'Account and Billing',
    copy:
      'Questions about subscription status, purchases, or app access can be handled directly with support.',
  },
]
</script>

<template>
  <section class="section support-page" aria-labelledby="support-title">
    <div class="wrap">
      <p class="section-kicker">Support</p>
      <h1 id="support-title" class="section-title">Contact Us</h1>
      <p class="section-lead">
        Need help with setup, account access, billing, or anything else? Reach out directly and we
        will get back to you.
      </p>

      <ol class="support-list">
        <li v-for="(topic, index) in topics" :key="topic.title">
          <span class="support-num">{{ String(index + 1).padStart(2, '0') }}</span>
          <div>
            <h2>{{ topic.title }}</h2>
            <p v-if="topic.href">
              Send questions or support requests to
              <a :href="topic.href">{{ topic.linkLabel }}</a>.
            </p>
            <p v-else>{{ topic.copy }}</p>
          </div>
        </li>
      </ol>

      <p class="support-note">
        Looking to delete your account?
        <RouterLink to="/accountdeletion">Account deletion instructions</RouterLink>
      </p>
    </div>
  </section>
</template>

<style scoped>
.support-page {
  padding-top: calc(var(--header-h) + 3rem);
  background: linear-gradient(180deg, var(--soft), var(--paper));
}

.support-list {
  list-style: none;
  margin: 2.5rem 0 0;
  padding: 0;
}

.support-list li {
  display: grid;
  grid-template-columns: 3.25rem 1fr;
  gap: 1rem;
  padding: 1.35rem 0;
  border-top: 1px solid var(--line);
}

.support-list li:last-child {
  border-bottom: 1px solid var(--line);
}

.support-num {
  font-family: var(--font-display);
  font-size: 1.6rem;
  color: var(--green-deep);
}

.support-list h2 {
  font-size: 1.85rem;
  margin-bottom: 0.35rem;
}

.support-list p,
.support-note {
  color: var(--muted);
}

.support-list a,
.support-note a {
  color: var(--green-deep);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.support-note {
  margin-top: 2rem;
  font-size: 0.95rem;
}
</style>

<script setup>
</script>

<template>
  <section class="section deletion-page" aria-labelledby="deletion-title">
    <div class="wrap deletion-doc">
      <p class="section-kicker">Account</p>
      <h1 id="deletion-title" class="section-title">Delete your Drop N Launch account</h1>
      <p class="section-lead">Haas N Hammer Studios LLC</p>

      <p class="intro">
        You can delete your account and associated data in either of two ways:
      </p>

      <h2>Option A: In-app (fastest)</h2>
      <ol>
        <li>Open <strong>Drop N Launch</strong> and sign in.</li>
        <li>Go to <strong>Profile → Account → Delete Account</strong>.</li>
        <li>Confirm deletion. We immediately queue your account for removal.</li>
      </ol>

      <h2>Option B: Request via support</h2>
      <p>
        Email
        <a href="mailto:support@dropnlaunch.com">support@dropnlaunch.com</a>
        from the email/Apple Private Relay/Google account used in the app and include:
        “Delete my Drop N Launch account.”
      </p>

      <h2>What will be deleted</h2>
      <ul>
        <li>Profile information (name/nickname, birthdate, height/weight, skill level)</li>
        <li>Swing metrics and session history</li>
        <li>Uploaded/recorded swing videos (Firebase/Backblaze storage)</li>
        <li>App-specific identifiers and preferences</li>
      </ul>

      <h2>What may be retained (and for how long)</h2>
      <ul>
        <li>
          Minimal records needed for <strong>fraud prevention, security, or legal obligations</strong>
          (e.g., transaction logs) kept for up to <strong>30 days</strong> unless law requires longer.
        </li>
        <li>
          Aggregated/anonymized analytics that <strong>cannot identify you</strong> may be retained.
        </li>
      </ul>

      <h2>Timeline</h2>
      <ul>
        <li>In-app deletions begin immediately; most data is removed within <strong>24–72 hours</strong>.</li>
        <li>Backups and CDN caches are purged within <strong>up to 30 days</strong>.</li>
      </ul>

      <h2>Notes</h2>
      <ul>
        <li>
          Deleting your Drop N Launch account <strong>does not delete</strong> your Apple ID or Google
          account.
        </li>
        <li>
          If you subscribed via Google Play, cancel the subscription in
          <strong>Google Play → Payments &amp; Subscriptions</strong> to stop future charges.
        </li>
        <li>
          If you subscribed via <strong>Apple</strong>, cancel in
          <strong>Settings → [your name] → Subscriptions → Drop N Launch</strong>, or open the
          <strong>App Store → account icon → Subscriptions</strong> and cancel there. This stops
          future charges from Apple.
        </li>
      </ul>

      <p class="more-help">
        Need other help?
        <RouterLink to="/support">Contact support</RouterLink>
        ·
        <RouterLink to="/privacy-policy">Privacy Policy</RouterLink>
      </p>
    </div>
  </section>
</template>

<style scoped>
.deletion-page {
  padding-top: calc(var(--header-h) + 3rem);
  background: linear-gradient(180deg, var(--soft), var(--paper));
}

.deletion-doc {
  max-width: 48rem;
}

.deletion-doc .section-lead {
  margin-top: 0.5rem;
}

.intro,
.deletion-doc p,
.deletion-doc li {
  color: var(--muted);
  line-height: 1.65;
}

.intro {
  margin-top: 1.5rem;
}

.deletion-doc h2 {
  margin: 2rem 0 0.75rem;
  font-size: 1.7rem;
}

.deletion-doc ol,
.deletion-doc ul {
  margin: 0.5rem 0 0;
  padding-left: 1.25rem;
}

.deletion-doc li + li {
  margin-top: 0.4rem;
}

.deletion-doc strong {
  color: var(--ink);
}

.deletion-doc a {
  color: var(--green-deep);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.more-help {
  margin-top: 2.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--line);
  font-size: 0.95rem;
}
</style>

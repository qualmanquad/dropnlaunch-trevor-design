<script setup>
</script>

<template>
  <footer class="site-footer">
    <div class="footer-inner wrap">
      <div class="footer-brand">
        <img
          class="footer-logo"
          src="/assets/dropnlaunch-logo.png"
          alt="Drop N Launch"
          width="180"
          height="64"
        />
      </div>

      <div class="footer-links">
        <RouterLink to="/get-started">Get Started</RouterLink>
        <RouterLink to="/about-us">About</RouterLink>
        <a href="https://leaderboards.dropnlaunch.com" target="_blank" rel="noreferrer">
          Leaderboards
        </a>
        <RouterLink to="/support">Support</RouterLink>
        <RouterLink to="/privacy-policy">Privacy Policy</RouterLink>
      </div>
    </div>
    <div class="footer-bottom wrap">
      <span>&copy; {{ new Date().getFullYear() }} Drop N Launch — Haas N Hammer Studios LLC.</span>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  padding: 2.5rem 0 1.5rem;
  background: var(--ink);
  color: rgba(255, 255, 255, 0.82);
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: wrap;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.footer-brand {
  display: flex;
  align-items: center;
}

.footer-logo {
  display: block;
  height: 4.5rem;
  width: auto;
  object-fit: contain;
}

.footer-links {
  display: flex;
  gap: 1.25rem;
  font-weight: 600;
  font-size: 0.92rem;
}

.footer-links a:hover {
  color: var(--green);
}

.footer-bottom {
  padding-top: 1rem;
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.45);
}
</style>

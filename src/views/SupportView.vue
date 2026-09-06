<template>
  <section class="section support-page" aria-labelledby="support-title">
    <div class="wrap">
      <p class="section-kicker">Support</p>
      <h1 id="support-title" class="section-title">Contact Us</h1>
      <p class="section-lead">
        Need help with setup, account access, billing, or anything else? Reach out directly and we
        will get back to you.
      </p>

      <div class="support-email">
        <h2>Email Support</h2>
        <p>
          Send questions or support requests to
          <a href="mailto:support@dropnlaunch.com">support@dropnlaunch.com</a>.
        </p>
      </div>

      <div class="pro-tips" aria-labelledby="pro-tips-title">
        <h2 id="pro-tips-title">Pro Tips</h2>
        <ul class="tip-list">
          <li>Start the pitch or swing when the front light is green.</li>
          <li>
            Once the device senses movement the front light will turn red and there is only a small
            window to complete your swing. Limit excessive movement in the hitting zone prior to
            beginning the swing.
          </li>
          <li>If the front light locks on red or white, restart the monitor.</li>
          <li>
            If your system is failing to read:
            <ol class="tip-steps">
              <li>
                First, confirm that the monitor is the correct distance from the hitting zone, that
                the ball has 8 feet to travel, and that the angle of the monitor matches
                specifications.
              </li>
              <li>
                If you are still experiencing failed readings, confirm that the monitor is paired by
                clicking the menu button from within a training mode, or by clicking settings from
                the Dashboard.
              </li>
              <li>If the monitor is paired and not reading, restart the monitor.</li>
              <li>If failures persist, reboot Drop N Launch App.</li>
            </ol>
          </li>
        </ul>
      </div>

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

.support-email,
.pro-tips {
  margin-top: 2.5rem;
  padding: 1.35rem 0;
  border-top: 1px solid var(--line);
}

.pro-tips {
  border-bottom: 1px solid var(--line);
}

.support-email h2,
.pro-tips h2 {
  font-size: 1.85rem;
  margin-bottom: 0.35rem;
}

.support-email p,
.pro-tips li,
.support-note {
  color: var(--muted);
}

.support-email a,
.support-note a {
  color: var(--green-deep);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.tip-list,
.tip-steps {
  margin: 0.85rem 0 0;
  padding-left: 1.25rem;
}

.tip-list > li + li {
  margin-top: 0.75rem;
}

.tip-steps {
  margin-top: 0.65rem;
}

.tip-steps li + li {
  margin-top: 0.45rem;
}

.support-note {
  margin-top: 2rem;
  font-size: 0.95rem;
}
</style>

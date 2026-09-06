<script setup>
import StoreBadges from '../components/StoreBadges.vue'

const needs = [
  {
    title: 'Drop N Launch app',
    copy: 'Download the app, create your account, and subscribe to Drop N Launch.',
    stores: true,
  },
  {
    title: 'Garmin Approach R10',
    copy: 'Purchase your Garmin Approach R10.',
    garmin: true,
  },
  {
    title: 'Tripod',
    copy:
      'We recommend a light, and easily adjustable cell phone tripod like this one to hold your launch monitor. We recommend using a second tripod to hold your iOS or Android device while hitting.',
  },
  {
    title: 'Space to Hit',
    copy: 'All you need is 14 feet.',
  },
]

const setupSteps = [
  {
    title: 'Open the Drop N Launch App',
  },
  {
    title: 'Power on the Garmin Approach R10 Monitor.',
    copy:
      'The front light will blink blue to indicate pairing mode. If not blinking blue, hold the power button until the light turns blue.',
  },
  {
    title: 'Accept the pairing notification on your mobile device.',
  },
  {
    title: 'Place the monitor in a tripod and locate 6-8 feet behind the hitter.',
    copy: 'Ensure that there is 8 feet in front of the hitter for ball flight.',
  },
  {
    title: 'Adjust height to just below the hitter’s waist.',
    copy: 'This height is ideal but perfection is not required.',
  },
  {
    title: 'Set the tilt angle of the monitor to approximately 20 degrees.',
    copy:
      'For angle reference you can attach the monitor to the mini tripod that came with the unit.',
  },
  {
    title: 'Navigate to settings and select “Edit Profile” to complete profile.',
    copy: 'Select “Make My Profile Public” for placement on the Leaderboard.',
  },
  {
    title: 'Select a game mode.',
  },
  {
    title: 'Play. Train. Improve.',
  },
]

const mainSetupVideoId = 'ZqBlrN3pSvU'
const mainSetupYoutubeUrl = `https://youtu.be/${mainSetupVideoId}?si=epjm5pI4oAr0j_rS`
const garminUrl = 'https://www.garmin.com/en-US/p/695391'
</script>

<template>
  <div>
    <section class="section needs" aria-labelledby="needs-title">
      <div class="wrap">
        <p class="section-kicker">Get started</p>
        <h1 id="needs-title" class="section-title">What you need</h1>

        <ol class="step-list">
          <li v-for="(item, index) in needs" :key="item.title">
            <span class="step-num">{{ String(index + 1).padStart(2, '0') }}</span>
            <div>
              <h2>{{ item.title }}</h2>
              <p>{{ item.copy }}</p>
              <StoreBadges v-if="item.stores" class="need-stores" />
              <a
                v-if="item.garmin"
                class="button button-ghost garmin-link"
                :href="garminUrl"
                target="_blank"
                rel="noreferrer"
              >
                View Garmin R10
              </a>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <section class="section setup-steps" aria-labelledby="setup-title">
      <div class="wrap">
        <h2 id="setup-title" class="section-title">The Setup</h2>

        <ol class="step-list">
          <li v-for="(item, index) in setupSteps" :key="item.title">
            <span class="step-num">{{ String(index + 1).padStart(2, '0') }}</span>
            <div>
              <h3>{{ item.title }}</h3>
              <p v-if="item.copy">{{ item.copy }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <section class="section setup-video" aria-labelledby="setup-video-title">
      <div class="wrap setup-video-layout">
        <div class="setup-video-copy">
          <p class="section-kicker">Setup instructions</p>
          <h2 id="setup-video-title" class="section-title">Watch the setup video first</h2>
          <p class="section-lead">
            The setup video walks through where to place the Garmin R10, how much space you need,
            and how to get your first session ready before you start swinging.
          </p>
          <a
            class="button button-primary"
            :href="mainSetupYoutubeUrl"
            target="_blank"
            rel="noreferrer"
          >
            Open on YouTube
          </a>
        </div>

        <div class="video-frame" aria-label="Drop N Launch setup tutorial video">
          <iframe
            :src="`https://www.youtube.com/embed/${mainSetupVideoId}`"
            title="Drop N Launch setup tutorial"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </section>

    <section class="section support" aria-labelledby="support-title">
      <div class="wrap support-inner">
        <div>
          <p class="section-kicker">Support</p>
          <h2 id="support-title" class="section-title">Need a hand?</h2>
          <p class="section-lead">
            From R10 pairing to camera placement, reach out and we’ll help you get your first
            session rolling.
          </p>
        </div>
        <RouterLink class="button button-primary" to="/support">Contact support</RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.needs {
  padding-top: calc(var(--header-h) + 3.5rem);
  background:
    radial-gradient(circle at 80% 20%, rgba(118, 206, 0, 0.18), transparent 34%),
    linear-gradient(180deg, var(--soft), var(--paper));
}

.step-list {
  list-style: none;
  margin: 2.5rem 0 0;
  padding: 0;
}

.step-list li {
  display: grid;
  grid-template-columns: 3.25rem 1fr;
  gap: 1rem;
  padding: 1.35rem 0;
  border-top: 1px solid var(--line);
}

.step-list li:last-child {
  border-bottom: 1px solid var(--line);
}

.step-num {
  font-family: var(--font-display);
  font-size: 1.6rem;
  color: var(--green-deep);
}

.step-list h2,
.step-list h3 {
  font-size: 1.85rem;
  margin-bottom: 0.35rem;
}

.setup-steps .step-list h3 {
  max-width: 38rem;
  font-family: var(--font-body);
  font-size: 1.12rem;
  font-weight: 700;
  letter-spacing: 0;
  line-height: 1.4;
}

.step-list p {
  color: var(--muted);
}

.setup-steps {
  background: var(--paper);
}

.setup-steps .step-list p {
  max-width: 38rem;
}

.need-stores {
  margin-top: 1rem;
}

.garmin-link {
  margin-top: 1rem;
}

.setup-video {
  background:
    radial-gradient(circle at 12% 20%, rgba(118, 206, 0, 0.16), transparent 32%),
    linear-gradient(180deg, var(--soft), #eaf4ff);
}

.setup-video-layout {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: clamp(1.5rem, 4vw, 3rem);
  align-items: center;
}

.setup-video-copy .button {
  margin-top: 1.5rem;
}

.video-frame {
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  background: #0d1210;
  border: 1px solid var(--line);
  box-shadow: var(--shadow-soft);
}

.video-frame iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

.support {
  background: linear-gradient(120deg, var(--green-soft), #dff3ff 70%);
}

.support-inner {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: wrap;
}

@media (max-width: 900px) {
  .setup-video-layout {
    grid-template-columns: 1fr;
  }
}
</style>

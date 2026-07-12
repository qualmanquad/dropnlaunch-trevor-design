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
    copy:
      'Pair your Garmin Approach R10 Launch monitor to your iOS or Android device running the Drop N Launch app.',
    garmin: true,
  },
  {
    title: 'Space to hit',
    copy:
      'Set the monitor 6-8 feet behind the hitter and leave at least 8 feet in front for ball flight.',
  },
  {
    title: 'Your hitting setup',
    copy:
      'Use a tee, pitching machine, live arm, net, impact screen, cage, garage, or open field.',
  },
]

const setups = [
  {
    id: 'setup-garage',
    title: 'Garage setup',
    copy: 'Great for indoor or backyard training where you have limited swing space and a net setup.',
    videoId: 'af_aDsnYxP8',
  },
  {
    id: 'setup-cage',
    title: 'Cage setup',
    copy: 'Best for live arm, machine, or cage training where ball return and rebound are available.',
    videoId: '4P8w1tH8lWE',
  },
  {
    id: 'setup-field',
    title: 'Field setup',
    copy: 'Use this for open-field sessions focused on long-flight tracking and outdoor training flow.',
    videoId: 'dxg60MYsQb4',
  },
]

const mainSetupVideoId = 'ZqBlrN3pSvU'
const mainSetupYoutubeUrl = `https://youtu.be/${mainSetupVideoId}?si=epjm5pI4oAr0j_rS`
const garminUrl = 'https://www.garmin.com/en-US/p/695391'
</script>

<template>
  <div>
    <section class="section page-hero" aria-labelledby="gs-title">
      <div class="wrap">
        <p class="section-kicker">Get started</p>
        <h1 id="gs-title" class="section-title">Everything you need to start tracking swings</h1>
        <p class="section-lead">
          Drop N Launch connects your mobile device to the Garmin Approach R10 so players can
          capture exit velocity, launch angle, direction, distance, and swing video anywhere they
          train.
        </p>
        <StoreBadges class="hero-stores" />
      </div>
    </section>

    <section class="section needs" aria-labelledby="needs-title">
      <div class="wrap">
        <p class="section-kicker">Before your first swing</p>
        <h2 id="needs-title" class="section-title">What you need</h2>
        <p class="section-lead">
          Start with these basics, then choose the setup guide that matches where you train.
        </p>

        <ol class="need-list">
          <li v-for="(item, index) in needs" :key="item.title">
            <span class="need-num">{{ String(index + 1).padStart(2, '0') }}</span>
            <div>
              <h3>{{ item.title }}</h3>
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

    <section id="setups" class="section setups" aria-labelledby="setups-title">
      <div class="wrap">
        <p class="section-kicker">Choose your space</p>
        <h2 id="setups-title" class="section-title">Setup guides</h2>
        <p class="section-lead">Use the guide that matches your training environment.</p>

        <div class="setup-grid">
          <article v-for="setup in setups" :id="setup.id" :key="setup.id" class="setup">
            <h3>{{ setup.title }}</h3>
            <p>{{ setup.copy }}</p>
            <div class="video-frame setup-video-embed" :aria-label="`${setup.title} video`">
              <iframe
                :src="`https://www.youtube.com/embed/${setup.videoId}`"
                :title="setup.title"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>
          </article>
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
.page-hero {
  padding-top: calc(var(--header-h) + 3.5rem);
  background:
    radial-gradient(circle at 80% 20%, rgba(118, 206, 0, 0.18), transparent 34%),
    linear-gradient(180deg, var(--soft), var(--paper));
}

.hero-stores {
  margin-top: 1.75rem;
}

.needs {
  background: var(--paper);
}

.need-list {
  list-style: none;
  margin: 2.5rem 0 0;
  padding: 0;
}

.need-list li {
  display: grid;
  grid-template-columns: 3.25rem 1fr;
  gap: 1rem;
  padding: 1.35rem 0;
  border-top: 1px solid var(--line);
}

.need-list li:last-child {
  border-bottom: 1px solid var(--line);
}

.need-num {
  font-family: var(--font-display);
  font-size: 1.6rem;
  color: var(--green-deep);
}

.need-list h3 {
  font-size: 1.85rem;
  margin-bottom: 0.35rem;
}

.need-list p {
  color: var(--muted);
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

.setups {
  background: var(--paper);
}

.setup-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 2.5rem;
}

.setup h3 {
  font-size: 2rem;
}

.setup {
  scroll-margin-top: calc(var(--header-h) + 2.5rem);
}

.setup > p {
  margin: 0.45rem 0 1rem;
  color: var(--muted);
}

.setup-video-embed {
  margin-top: 0.25rem;
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
  .setup-video-layout,
  .setup-grid {
    grid-template-columns: 1fr;
  }
}
</style>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import {
  ChevronLeft,
  ChevronRight,
  CircleDot,
  Compass,
  ExternalLink,
  Gauge,
  MapPin,
  MoveUpRight,
  RotateCw,
  Video,
  Zap,
} from '@lucide/vue'
import HudChip from '../components/HudChip.vue'
import StoreBadges from '../components/StoreBadges.vue'

const hudStats = [
  { label: 'Exit Velocity', value: 85, unit: 'MPH', fill: 0.78 },
  { label: 'Launch Angle', value: 27, unit: '°', fill: 0.45 },
  { label: 'Carry', value: 290, unit: 'FT', fill: 0.86 },
  { label: 'Direction', value: 'Right Field', unit: '', fill: 0.62 },
]

const hudActive = ref(false)
const hudRowRef = ref(null)
const heroImageRef = ref(null)
const pageRef = ref(null)
let hudObserver
let revealObserver
let parallaxRaf = 0
let reduceMotion = false

function updateHeroParallax() {
  parallaxRaf = 0
  const image = heroImageRef.value
  if (!image || reduceMotion) return

  const scrollY = window.scrollY
  if (scrollY > window.innerHeight * 1.25) return

  image.style.transform = `translate3d(0, ${scrollY * 0.32}px, 0)`
}

function onParallaxScroll() {
  if (parallaxRaf) return
  parallaxRaf = requestAnimationFrame(updateHeroParallax)
}

function setupReveals() {
  const nodes = pageRef.value?.querySelectorAll('.reveal')
  if (!nodes?.length) return

  if (reduceMotion) {
    nodes.forEach((el) => el.classList.add('is-in'))
    return
  }

  revealObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('is-in')
        revealObserver?.unobserve(entry.target)
      }
    },
    { threshold: 0.14, rootMargin: '0px 0px -6% 0px' },
  )

  nodes.forEach((el) => revealObserver.observe(el))
}

onMounted(() => {
  reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  hudObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        hudActive.value = true
        hudObserver?.disconnect()
      }
    },
    { threshold: 0.4 },
  )

  if (hudRowRef.value) hudObserver.observe(hudRowRef.value)

  setupReveals()
  preloadShowcaseImages()

  if (!reduceMotion) {
    updateHeroParallax()
    window.addEventListener('scroll', onParallaxScroll, { passive: true })
  }
})

onUnmounted(() => {
  hudObserver?.disconnect()
  revealObserver?.disconnect()
  window.removeEventListener('scroll', onParallaxScroll)
  if (parallaxRaf) cancelAnimationFrame(parallaxRaf)
})

const stats = [
  {
    name: 'Exit Velocity',
    icon: Gauge,
    copy: 'See how hard the ball comes off the bat so players can train for stronger, more consistent contact.',
  },
  {
    name: 'Launch Angle',
    icon: MoveUpRight,
    copy: 'Understand ball flight immediately and connect swing changes to better contact quality.',
  },
  {
    name: 'Carry',
    icon: MapPin,
    copy: 'Track carry distance swing by swing and make every batting practice session more competitive and measurable.',
  },
  {
    name: 'Direction',
    icon: Compass,
    copy: 'See where the ball is sprayed — left, center, or right — after every hit.',
  },
  {
    name: 'Ball Speed',
    icon: CircleDot,
    copy: 'Ball speed off the bat in game and training views.',
  },
  {
    name: 'Spin',
    icon: RotateCw,
    copy: 'Track spin to understand ball flight and contact quality.',
  },
  {
    name: 'Swing Speed',
    icon: Zap,
    copy: 'Bat speed metrics to connect mechanics with results.',
  },
  {
    name: 'Swing Video',
    icon: Video,
    copy: 'Record swings alongside your data so players can connect mechanics, timing, and results.',
  },
]

const places = [
  {
    title: 'On the Field',
    copy: 'Take real swing data wherever you train and see instant feedback after every hit.',
    image: '/assets/place-field.webp',
    alt: 'Batter on the field with Drop N Launch swing metrics overlay',
    setupTo: '/get-started#setup-field',
  },
  {
    title: 'In Your Garage',
    copy: 'Turn a compact home setup into a powerful training space with real ball metrics and video.',
    image: '/assets/place-garage.webp',
    alt: 'Garage batting setup with projected Drop N Launch stadium',
    setupTo: '/get-started#setup-garage',
  },
  {
    title: 'In the Cage',
    copy: 'Make cage work more productive with live data, virtual ball flight, and competitive modes.',
    image: '/assets/place-cage.webp',
    alt: 'Phone filming a batter in the cage with live Drop N Launch swing metrics on screen',
    setupTo: '/get-started#setup-cage',
  },
]

const appScreens = [
  {
    kicker: 'Swing Lab',
    title: 'Review every swing in detail.',
    lead: 'See exit velocity, launch angle, carry, direction, and more the moment the ball leaves the bat.',
    image: '/assets/showcase-cage.webp',
    alt: 'Drop N Launch Swing Lab overlay tracking a swing in the batting cage',
  },
  {
    kicker: 'On the field',
    title: 'Train with real game feedback.',
    lead: 'Capture live metrics and virtual ball flight wherever you hit — cage, garage, or open field.',
    image: '/assets/showcase-field.webp',
    alt: 'Drop N Launch tracking a swing on the field with stadium ball flight view',
  },
  {
    kicker: 'Head to head',
    title: 'Play against other hitters.',
    lead: 'Challenge friends or rivals in competitive matchups and see who comes out on top.',
    image: '/assets/showcase-game.webp',
    alt: 'Drop N Launch game mode with stadium view, scoreboard, and live swing metrics',
  },
]

const leaderboardPreview = [
  { rank: 1, name: 'Coach Cooper Coe', handle: '@cooper33coe', age: '19+', ev: '113', location: 'Kountze, TX' },
  { rank: 5, name: 'Carter Melton', handle: '@cartermelton6', age: '17U', ev: '101', location: 'Galva, KS' },
  { rank: 6, name: 'Caden Kolesar', handle: '@cadenk48', age: '18U', ev: '100', location: 'Brimfield, OH' },
  { rank: 18, name: 'Milo Mason', handle: '@milo-mason-2027', age: '18U', ev: '92', location: 'Japan' },
  { rank: 30, name: 'Carson McRae', handle: '@cmcrae99', age: '13U', ev: '90', location: 'Bend, OR' },
]

const leaderboardsUrl = 'https://leaderboards.dropnlaunch.com/leaderboards'

const screenIndex = ref(0)

const activeScreen = computed(() => appScreens[screenIndex.value])

function prevScreen() {
  screenIndex.value = (screenIndex.value - 1 + appScreens.length) % appScreens.length
}

function nextScreen() {
  screenIndex.value = (screenIndex.value + 1) % appScreens.length
}

function preloadShowcaseImages() {
  for (const screen of appScreens) {
    const image = new Image()
    image.decoding = 'async'
    image.src = screen.image
  }
}
</script>

<template>
  <div ref="pageRef">
    <section class="hero" aria-labelledby="hero-brand">
      <div class="hero-media" aria-hidden="true">
        <img
          ref="heroImageRef"
          src="/assets/hero.jpg"
          alt=""
          width="1024"
          height="571"
        />
      </div>
      <div class="hero-veil" aria-hidden="true"></div>

      <div class="hero-layout wrap">
        <div class="hero-content">
          <p class="hero-eyebrow">Ignore the bunt sign</p>
          <p id="hero-brand" class="hero-brand">Drop N Launch</p>
          <h1 class="hero-title">Start training with real swing data</h1>
          <p class="hero-lead">
            Turn batting practice into measurable, competitive reps — real swing data anywhere you
            train.
          </p>
          <StoreBadges class="hero-cta" />
        </div>

        <aside class="phone-float" aria-label="Drop N Launch app preview">
          <div class="phone-shell">
            <div class="phone-screen">
              <img
                src="/assets/phone-screen-placeholder.webp"
                alt="Drop N Launch app home screen"
                width="473"
                height="1024"
              />
              <div class="phone-island" aria-hidden="true"></div>
              <div class="phone-home" aria-hidden="true"></div>
            </div>
          </div>
        </aside>
      </div>
    </section>

    <section class="section stats" aria-labelledby="stats-title">
      <div class="wrap stats-head reveal">
        <p class="section-kicker">Performance tracking</p>
        <h2 id="stats-title" class="section-title">Live metrics on every swing</h2>
        <p class="section-lead">
          Drop N Launch captures live swing metrics, video, and game-style results so players can
          measure progress and make practice more effective.
        </p>
      </div>

      <div class="stats-stage reveal">
        <div ref="hudRowRef" class="hud-row" aria-label="Live swing readout">
          <HudChip
            v-for="(item, index) in hudStats"
            :key="item.label"
            :label="item.label"
            :value="item.value"
            :unit="item.unit"
            :fill="item.fill"
            :delay="index * 160"
            :active="hudActive"
          />
        </div>

        <div class="stats-visual">
          <img
            src="/assets/stats-hud.webp"
            alt="Batter mid-swing with Drop N Launch ball flight tracer"
            width="1024"
            height="682"
          />
          <div class="stats-veil" aria-hidden="true"></div>
        </div>

        <div class="wrap stats-grid reveal" aria-label="What Drop N Launch captures">
          <article v-for="stat in stats" :key="stat.name" class="stat">
            <component
              :is="stat.icon"
              class="stat-icon"
              :size="34"
              :stroke-width="2"
              aria-hidden="true"
            />
            <h3>{{ stat.name }}</h3>
            <p class="stat-copy">{{ stat.copy }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section showcase" aria-labelledby="showcase-title">
      <div class="wrap showcase-head reveal">
        <Transition name="showcase-fade" mode="out-in">
          <div :key="screenIndex" class="showcase-copy">
            <p class="section-kicker">{{ activeScreen.kicker }}</p>
            <h2 id="showcase-title" class="section-title showcase-title">
              {{ activeScreen.title }}
            </h2>
            <p class="section-lead">{{ activeScreen.lead }}</p>
          </div>
        </Transition>
      </div>

      <div class="wrap showcase-stage reveal">
        <button
          type="button"
          class="showcase-arrow"
          aria-label="Previous screen"
          @click="prevScreen"
        >
          <ChevronLeft :size="28" :stroke-width="2.25" aria-hidden="true" />
        </button>

        <div class="showcase-phone" :aria-label="`App screen: ${activeScreen.kicker}`">
          <div class="showcase-shell">
            <div class="showcase-screen">
              <img
                v-for="(screen, index) in appScreens"
                :key="screen.kicker"
                class="showcase-image"
                :class="{ 'is-active': index === screenIndex }"
                :src="screen.image"
                :alt="index === screenIndex ? screen.alt : ''"
                :aria-hidden="index !== screenIndex"
                width="1024"
                height="473"
                decoding="async"
                :fetchpriority="index === 0 ? 'high' : 'low'"
              />
              <div class="showcase-island" aria-hidden="true"></div>
              <div class="showcase-home" aria-hidden="true"></div>
            </div>
          </div>
        </div>

        <button
          type="button"
          class="showcase-arrow"
          aria-label="Next screen"
          @click="nextScreen"
        >
          <ChevronRight :size="28" :stroke-width="2.25" aria-hidden="true" />
        </button>
      </div>

      <div class="wrap showcase-dots reveal" role="tablist" aria-label="App screens">
        <button
          v-for="(screen, index) in appScreens"
          :key="screen.kicker"
          type="button"
          class="showcase-dot"
          :class="{ 'is-active': index === screenIndex }"
          role="tab"
          :aria-selected="index === screenIndex"
          :aria-label="screen.title"
          @click="screenIndex = index"
        />
      </div>
    </section>

    <section class="section places" aria-labelledby="places-title">
      <div class="wrap reveal">
        <p class="section-kicker">Train anywhere</p>
        <h2 id="places-title" class="section-title places-title">
          Track swing data anywhere you train.
        </h2>
        <p class="section-lead">
          Bring Drop N Launch to the field, garage, or cage — real swing metrics wherever you hit.
        </p>

        <div class="places-grid">
          <article v-for="place in places" :key="place.title" class="place">
            <figure class="place-image" :class="{ 'is-pending': place.pending }">
              <img
                :src="place.image"
                :alt="place.alt"
                width="1024"
                height="768"
              />
            </figure>
            <h3>{{ place.title }}</h3>
            <p>{{ place.copy }}</p>
            <RouterLink class="place-setup" :to="place.setupTo">Get started →</RouterLink>
          </article>
        </div>
      </div>
    </section>

    <section class="section leaderboards" aria-labelledby="leaderboards-title">
      <div class="wrap leaderboards-inner reveal">
        <div class="leaderboards-copy">
          <p class="section-kicker">Leaderboards</p>
          <h2 id="leaderboards-title" class="section-title leaderboards-title">
            Climb the ranks.
          </h2>
          <p class="section-lead">
            Compete against users all across the world. See where you stack up — then beat it.
          </p>
          <a
            class="button button-primary leaderboards-cta"
            :href="leaderboardsUrl"
            target="_blank"
            rel="noreferrer"
          >
            View full leaderboards
            <ExternalLink :size="18" :stroke-width="2.25" aria-hidden="true" />
          </a>
        </div>

        <div class="leaderboard-board" aria-label="Max Exit Velocity leaderboard preview">
          <div class="leaderboard-board-head">
            <p class="leaderboard-board-label">Max Exit Velocity</p>
            <p class="leaderboard-board-meta">Baseball · All-Time · Top 100</p>
          </div>

          <div class="leaderboard-rows">
            <article
              v-for="entry in leaderboardPreview"
              :key="`${entry.rank}-${entry.handle}`"
              class="leaderboard-row"
            >
              <span class="leaderboard-rank">#{{ entry.rank }}</span>
              <div class="leaderboard-player">
                <p class="leaderboard-name">{{ entry.name }}</p>
                <p class="leaderboard-sub">
                  {{ entry.handle }} · {{ entry.age }} · {{ entry.location }}
                </p>
              </div>
              <p class="leaderboard-ev">
                <span>{{ entry.ev }}</span>
                <small>mph</small>
              </p>
            </article>
          </div>

          <a
            class="leaderboard-footer-link"
            :href="leaderboardsUrl"
            target="_blank"
            rel="noreferrer"
          >
            See all rankings on leaderboards.dropnlaunch.com
          </a>
        </div>
      </div>
    </section>

    <section id="download" class="section start" aria-labelledby="start-title">
      <div class="wrap start-inner reveal">
        <div>
          <p class="section-kicker">Download the app</p>
          <h2 id="start-title" class="section-title start-title">
            Start measuring your swing.
          </h2>
          <p class="section-lead">
            Free to download on iOS and Android. Turn every session into measurable,
            competitive reps.
          </p>
        </div>
        <div class="start-actions">
          <StoreBadges class="start-badges" />
          <RouterLink class="start-setup" to="/get-started">Getting Started Guide</RouterLink>
        </div>
        <img
          class="start-logo"
          src="/assets/dropnlaunch-logo-dark.png"
          alt="Drop N Launch"
          width="180"
          height="64"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  position: relative;
  z-index: 2;
  min-height: 100svh;
  display: grid;
  align-items: center;
  overflow: visible;
  color: var(--paper);
  padding-top: var(--header-h);
  box-sizing: border-box;
}

.hero-media,
.hero-veil {
  position: absolute;
  inset: 0;
}

.hero-media {
  overflow: hidden;
  pointer-events: none;
}

.hero-media img {
  width: 100%;
  height: 120%;
  object-fit: cover;
  object-position: 28% center;
  display: block;
  will-change: transform;
  backface-visibility: hidden;
}

.hero-veil {
  background:
    linear-gradient(180deg, rgba(8, 14, 10, 0.22) 0%, rgba(8, 14, 10, 0.12) 40%, rgba(8, 14, 10, 0.72) 100%),
    linear-gradient(90deg, rgba(8, 14, 10, 0.58) 0%, rgba(8, 14, 10, 0.2) 42%, transparent 72%);
}

.hero-layout {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: start;
  gap: clamp(1.25rem, 2.5vw, 2.25rem);
  padding-block: 2rem;
  animation: hero-rise 900ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

.hero-content {
  width: min(100%, 34rem);
  text-align: left;
}

.hero-content :deep(.store-badges) {
  justify-content: flex-start;
}

.hero-eyebrow {
  margin: 0 0 0.55rem;
  color: rgba(255, 255, 255, 0.78);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  text-align: left;
}

.hero-brand {
  margin-bottom: 0.85rem;
  font-family: var(--font-display);
  font-size: clamp(3.4rem, 10vw, 6.2rem);
  letter-spacing: 0.03em;
  line-height: 0.9;
  color: var(--green);
  text-shadow: 0 2px 24px rgba(0, 0, 0, 0.25);
}

.hero-title {
  max-width: 14ch;
  font-size: clamp(2.4rem, 6vw, 3.8rem);
  color: var(--paper);
}

.hero-lead {
  max-width: 30rem;
  margin-top: 1rem;
  color: rgba(255, 255, 255, 0.86);
  font-size: 1.12rem;
}

.hero-cta {
  margin-top: 1.75rem;
}

.phone-float {
  position: relative;
  z-index: 3;
  width: clamp(11.5rem, 18vw, 15rem);
  margin-bottom: -5.5rem;
  pointer-events: none;
}

.phone-shell {
  position: relative;
  padding: 0.2rem;
  border-radius: 1.85rem;
  background: #0a0a0a;
  box-shadow: 0 18px 40px rgba(8, 14, 10, 0.28);
}

.phone-screen {
  position: relative;
  overflow: hidden;
  aspect-ratio: 9 / 19.5;
  border-radius: 1.65rem;
  background: #000;
}

.phone-screen img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
}

.phone-island {
  position: absolute;
  z-index: 2;
  top: 0.55rem;
  left: 50%;
  width: 28%;
  height: 0.78rem;
  transform: translateX(-50%);
  border-radius: 999px;
  background: #0a0a0a;
}

.phone-home {
  position: absolute;
  z-index: 2;
  left: 50%;
  bottom: 0.45rem;
  width: 34%;
  height: 0.22rem;
  transform: translateX(-50%);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.55);
}

.stats {
  position: relative;
  z-index: 1;
  background: var(--paper);
  overflow: visible;
  padding-top: clamp(4.5rem, 9vw, 6.5rem);
}

.stats-head {
  margin-bottom: clamp(3.5rem, 6vw, 4.75rem);
}

.stats-stage {
  position: relative;
  padding-bottom: 1.25rem;
  overflow: visible;
}

.stats-visual {
  position: relative;
  width: 100%;
  min-height: clamp(24rem, 54vw, 36rem);
  overflow: hidden;
  background: #0d1210;
}

.stats-visual img {
  width: 100%;
  height: 100%;
  min-height: clamp(24rem, 54vw, 36rem);
  max-height: clamp(24rem, 54vw, 36rem);
  object-fit: cover;
  object-position: center 38%;
  display: block;
}

.stats-veil {
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    linear-gradient(180deg, rgba(8, 14, 10, 0.35) 0%, rgba(8, 14, 10, 0.08) 28%, rgba(8, 14, 10, 0.18) 58%, rgba(8, 14, 10, 0.78) 100%),
    linear-gradient(90deg, rgba(8, 14, 10, 0.28) 0%, transparent 42%);
  pointer-events: none;
}

.hud-row {
  position: absolute;
  z-index: 5;
  top: 0;
  left: 50%;
  width: min(100% - 2 * var(--space), var(--max));
  transform: translate(-50%, -50%);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.85rem;
  pointer-events: none;
}

.stats-grid {
  position: relative;
  z-index: 3;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  margin-top: clamp(-4.5rem, -7.5vw, -3rem);
  border: 1px solid var(--line);
  background: #fff;
  box-shadow: var(--shadow-soft);
}

.stat {
  padding: 1.25rem 1.2rem 1.4rem;
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  opacity: 0;
  transform: translateY(12px);
}

.stats-grid.is-in .stat {
  animation: feature-in 700ms ease both;
}

.stat:nth-child(4n) {
  border-right: 0;
}

.stat:nth-last-child(-n + 4) {
  border-bottom: 0;
}

.stat:nth-child(1) { animation-delay: 40ms; }
.stat:nth-child(2) { animation-delay: 80ms; }
.stat:nth-child(3) { animation-delay: 120ms; }
.stat:nth-child(4) { animation-delay: 160ms; }
.stat:nth-child(5) { animation-delay: 200ms; }
.stat:nth-child(6) { animation-delay: 240ms; }
.stat:nth-child(7) { animation-delay: 280ms; }
.stat:nth-child(8) { animation-delay: 320ms; }

.stat-icon {
  width: 2.15rem;
  height: 2.15rem;
  margin-bottom: 0.75rem;
  color: var(--green-deep);
}

.stat h3 {
  font-size: clamp(1.45rem, 2.4vw, 1.85rem);
  margin: 0 0 0.4rem;
}

.stat-copy {
  margin: 0;
  color: var(--muted);
  font-size: 0.95rem;
  line-height: 1.45;
}

.places {
  background: var(--paper);
}

.showcase {
  background: var(--soft);
}

.showcase-head {
  position: relative;
  text-align: center;
  min-height: clamp(11.5rem, 24vw, 14.5rem);
}

.showcase-copy {
  position: absolute;
  inset: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.showcase-copy .section-lead {
  margin-inline: auto;
}

.showcase-title {
  max-width: 14ch;
  margin-inline: auto;
}

.showcase-fade-enter-active,
.showcase-fade-leave-active {
  transition: opacity 220ms ease;
}

.showcase-fade-enter-from,
.showcase-fade-leave-to {
  opacity: 0;
}

.showcase-stage {
  display: grid;
  grid-template-columns: auto minmax(0, min(100%, 52rem)) auto;
  align-items: center;
  justify-content: center;
  gap: clamp(0.75rem, 2.5vw, 1.75rem);
  margin-top: 2.75rem;
}

.showcase-arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: #fff;
  color: var(--ink);
  box-shadow: var(--shadow-soft);
  transition: background-color 160ms ease, border-color 160ms ease, transform 160ms ease;
}

.showcase-arrow:hover {
  background: var(--green-soft);
  border-color: var(--green);
  transform: translateY(-1px);
}

.showcase-phone {
  width: min(100%, 52rem);
  container-type: inline-size;
  container-name: showcase-phone;
}

.showcase-shell {
  position: relative;
  padding: 1.15cqi;
  border-radius: 5.2cqi;
  background: #0a0a0a;
  box-shadow: 0 22px 48px rgba(8, 14, 10, 0.22);
}

.showcase-screen {
  position: relative;
  overflow: hidden;
  aspect-ratio: 19.5 / 9;
  border-radius: 4.2cqi;
  background: #0d1210;
}

.showcase-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  opacity: 0;
  transition: opacity 220ms ease;
  pointer-events: none;
}

.showcase-image.is-active {
  opacity: 1;
  z-index: 1;
}

@media (prefers-reduced-motion: reduce) {
  .showcase-image {
    transition: none;
  }
}

.showcase-island {
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 1.35cqi;
  width: 2.1cqi;
  height: 28%;
  transform: translateY(-50%);
  border-radius: 999px;
  background: #0a0a0a;
}

.showcase-home {
  position: absolute;
  z-index: 2;
  top: 50%;
  right: 1.1cqi;
  left: auto;
  bottom: auto;
  width: 0.65cqi;
  height: 34%;
  transform: translateY(-50%);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.45);
}

.showcase-dots {
  display: flex;
  justify-content: center;
  gap: 0.55rem;
  margin-top: 1.75rem;
}

.showcase-dot {
  flex: 0 0 0.55rem;
  width: 0.55rem;
  height: 0.55rem;
  min-width: 0.55rem;
  min-height: 0.55rem;
  padding: 0;
  border: 0;
  border-radius: 50%;
  aspect-ratio: 1 / 1;
  background: rgba(20, 26, 22, 0.18);
  transition: background-color 160ms ease, transform 160ms ease;
}

.showcase-dot.is-active {
  background: var(--green-deep);
  transform: scale(1.2);
}

.leaderboards {
  background: var(--ink);
  color: var(--paper);
}

.leaderboards .section-kicker {
  color: var(--green);
}

.leaderboards .section-lead {
  color: rgba(255, 255, 255, 0.72);
}

.leaderboards-title {
  max-width: 10ch;
  color: var(--paper);
}

.leaderboards-inner {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: clamp(2rem, 5vw, 3.5rem);
  align-items: center;
}

.leaderboards-cta {
  margin-top: 1.75rem;
}

.leaderboard-board {
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.04);
  box-shadow: 0 24px 50px rgba(0, 0, 0, 0.28);
  overflow: hidden;
}

.leaderboard-board-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.5rem 1rem;
  padding: 1.1rem 1.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(118, 206, 0, 0.08);
}

.leaderboard-board-label {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.55rem;
  letter-spacing: 0.04em;
  color: var(--green);
}

.leaderboard-board-meta {
  margin: 0;
  color: rgba(255, 255, 255, 0.55);
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.leaderboard-rows {
  display: grid;
}

.leaderboard-row {
  display: grid;
  grid-template-columns: 3.25rem minmax(0, 1fr) auto;
  gap: 0.85rem;
  align-items: center;
  padding: 0.95rem 1.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.leaderboard-row:last-child {
  border-bottom: 0;
}

.leaderboard-rank {
  font-family: var(--font-display);
  font-size: 1.35rem;
  letter-spacing: 0.03em;
  color: var(--green);
}

.leaderboard-name {
  margin: 0;
  font-weight: 700;
  font-size: 1rem;
}

.leaderboard-sub {
  margin: 0.15rem 0 0;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.82rem;
}

.leaderboard-ev {
  margin: 0;
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
  font-family: var(--font-display);
  font-size: 1.85rem;
  letter-spacing: 0.02em;
  color: var(--green);
  line-height: 1;
}

.leaderboard-ev small {
  font-family: var(--font-body);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.55);
}

.leaderboard-footer-link {
  display: block;
  padding: 0.95rem 1.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.62);
  font-size: 0.88rem;
  font-weight: 600;
  transition: color 160ms ease, background-color 160ms ease;
}

.leaderboard-footer-link:hover {
  color: var(--green);
  background: rgba(118, 206, 0, 0.06);
}

.places-title {
  max-width: 14ch;
}

.places-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.75rem;
  margin-top: 2.5rem;
}

.place h3 {
  margin-top: 1rem;
  font-size: 2rem;
}

.place p {
  margin-top: 0.45rem;
  color: var(--muted);
}

.place-setup {
  display: inline-block;
  margin-top: 0.85rem;
  color: var(--green-deep);
  font-size: 0.92rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  transition: color 160ms ease, transform 160ms ease;
}

.place-setup:hover {
  color: var(--ink);
  transform: translateX(2px);
}

.place-image {
  margin: 0;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: var(--green-soft);
  border: 1px solid var(--line);
}

.place-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.place-image.is-pending img {
  object-fit: contain;
  padding: 1.5rem;
}

.start {
  background:
    radial-gradient(circle at 18% 30%, rgba(118, 206, 0, 0.22), transparent 36%),
    linear-gradient(135deg, var(--green-soft), var(--soft) 55%, #dff3ff);
}

.start-title {
  max-width: 11ch;
  margin-inline: auto;
}

.start-inner {
  display: grid;
  gap: 1.75rem;
  justify-items: center;
  text-align: center;
}

.start-inner .section-lead {
  margin-inline: auto;
}

.start-logo {
  display: block;
  margin-top: 0.75rem;
  height: clamp(9rem, 24vw, 13rem);
  width: auto;
  max-width: min(94vw, 44rem);
  object-fit: contain;
}

.start-actions {
  display: grid;
  gap: 0.85rem;
  justify-items: center;
}

.start-actions :deep(.store-badges) {
  justify-content: center;
}

.start-actions :deep(.store-badges img) {
  height: 3.25rem;
}

.start-setup {
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--muted);
  text-decoration: underline;
  text-underline-offset: 0.18em;
  transition: color 160ms ease;
}

.start-setup:hover {
  color: var(--green-deep);
}

@keyframes hero-rise {
  from {
    opacity: 0;
    transform: translateY(28px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes feature-in {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition:
    opacity 700ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
}

.reveal.is-in {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .stat {
    opacity: 1;
    transform: none;
  }

  .stats-grid.is-in .stat {
    animation: none;
  }
}

@media (max-width: 900px) {
  .hero-layout {
    gap: 1.25rem;
    padding-block: 1.5rem;
  }

  .phone-float {
    width: clamp(10rem, 24vw, 12.5rem);
    margin-bottom: -4.25rem;
  }

  .leaderboards-inner {
    grid-template-columns: 1fr;
  }

  .stats-head {
    margin-bottom: clamp(5.25rem, 14vw, 7rem);
  }

  .hud-row {
    grid-template-columns: repeat(2, 1fr);
    transform: translate(-50%, -40%);
  }

  .stats-grid,
  .places-grid {
    grid-template-columns: 1fr 1fr;
  }

  .stat:nth-child(4n) {
    border-right: 1px solid var(--line);
  }

  .stat:nth-child(2n) {
    border-right: 0;
  }

  .stat:nth-last-child(-n + 4) {
    border-bottom: 1px solid var(--line);
  }

  .stat:nth-last-child(-n + 2) {
    border-bottom: 0;
  }
}

@media (max-width: 640px) {
  .phone-float {
    display: none;
  }

  .showcase-stage {
    grid-template-columns: auto minmax(0, 1fr) auto;
    gap: 0.65rem;
  }

  .showcase-arrow {
    width: 2.5rem;
    height: 2.5rem;
  }

  .showcase-phone {
    width: 100%;
  }

  .hero-layout {
    grid-template-columns: 1fr;
    padding-block: 1.5rem;
  }

  .stats {
    padding-top: clamp(3.5rem, 8vw, 5rem);
  }

  .hero-media img {
    object-position: 58% 42%;
  }

  .hero-veil {
    background:
      linear-gradient(180deg, rgba(8, 14, 10, 0.28) 0%, rgba(8, 14, 10, 0.2) 35%, rgba(8, 14, 10, 0.78) 100%),
      linear-gradient(90deg, rgba(8, 14, 10, 0.55) 0%, rgba(8, 14, 10, 0.15) 55%, transparent 100%);
  }

  .hud-row {
    gap: 0.55rem;
    transform: translate(-50%, -32%);
  }

  .stats-head {
    margin-bottom: clamp(5rem, 16vw, 6.5rem);
  }

  .stats-grid {
    margin-top: -3.25rem;
  }

  .stats-grid,
  .places-grid {
    grid-template-columns: 1fr;
  }

  .stat {
    border-right: 0;
    border-bottom: 1px solid var(--line);
  }

  .stat:nth-child(2n),
  .stat:nth-child(4n),
  .stat:nth-last-child(-n + 2),
  .stat:nth-last-child(-n + 4) {
    border-right: 0;
    border-bottom: 1px solid var(--line);
  }

  .stat:last-child {
    border-bottom: 0;
  }

  .places-grid {
    gap: 1.35rem;
  }
}
</style>

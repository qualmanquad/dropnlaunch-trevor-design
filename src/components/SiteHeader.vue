<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Menu, X } from '@lucide/vue'

const route = useRoute()
const router = useRouter()
const scrolled = ref(false)
const menuOpen = ref(false)
const isMobileNav = ref(false)

const isHome = computed(() => route.path === '/')
const solid = computed(() => !isHome.value || scrolled.value || menuOpen.value)
const showNav = computed(() => !isHome.value || scrolled.value)
const navInteractive = computed(() => showNav.value && (!isMobileNav.value || menuOpen.value))

function onScroll() {
  const next = window.scrollY > 24
  if (next !== scrolled.value) scrolled.value = next
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}

function scrollToDownload() {
  const target = document.getElementById('download')
  if (!target) return
  const top = target.getBoundingClientRect().top + window.scrollY - 80
  window.scrollTo({ top, behavior: 'smooth' })
}

async function onGetStartedClick(event) {
  event.preventDefault()
  closeMenu()

  if (route.path !== '/') {
    await router.push('/')
    await nextTick()
  }

  scrollToDownload()
}

function onKeydown(event) {
  if (event.key === 'Escape') closeMenu()
}

function syncMobileNav(event) {
  isMobileNav.value = event?.matches ?? window.matchMedia('(max-width: 720px)').matches
  if (!isMobileNav.value) closeMenu()
}

watch(
  () => route.fullPath,
  () => {
    closeMenu()
  },
)

watch(showNav, (visible) => {
  if (!visible) closeMenu()
})

let mobileMq

onMounted(() => {
  onScroll()
  mobileMq = window.matchMedia('(max-width: 720px)')
  syncMobileNav(mobileMq)
  mobileMq.addEventListener('change', syncMobileNav)
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  mobileMq?.removeEventListener('change', syncMobileNav)
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <header
    class="site-header"
    :class="{
      'is-scrolled': solid,
      'nav-visible': showNav,
      'menu-open': menuOpen,
    }"
  >
    <div class="header-inner wrap">
      <RouterLink class="brand" to="/" aria-label="Drop N Launch home" @click="closeMenu">
        <span class="brand-logos" aria-hidden="true">
          <img
            class="brand-logo brand-logo-light"
            src="/assets/dropnlaunch-logo.png"
            alt=""
            width="180"
            height="64"
          />
          <img
            class="brand-logo brand-logo-dark"
            src="/assets/dropnlaunch-logo-dark.png"
            alt=""
            width="180"
            height="64"
          />
        </span>
        <span class="visually-hidden">Drop N Launch</span>
      </RouterLink>

      <button
        type="button"
        class="nav-toggle"
        :aria-expanded="menuOpen"
        aria-controls="site-nav"
        :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
        :tabindex="showNav ? 0 : -1"
        @click="toggleMenu"
      >
        <X v-if="menuOpen" :size="22" :stroke-width="2.25" aria-hidden="true" />
        <Menu v-else :size="22" :stroke-width="2.25" aria-hidden="true" />
      </button>

      <nav
        id="site-nav"
        class="site-nav"
        aria-label="Primary"
        :aria-hidden="(!navInteractive).toString()"
      >
        <RouterLink to="/" :tabindex="navInteractive ? 0 : -1" @click="closeMenu">Home</RouterLink>
        <RouterLink to="/about-us" :tabindex="navInteractive ? 0 : -1" @click="closeMenu">
          About
        </RouterLink>
        <a
          href="https://leaderboards.dropnlaunch.com"
          target="_blank"
          rel="noreferrer"
          :tabindex="navInteractive ? 0 : -1"
          @click="closeMenu"
        >
          Leaderboards
        </a>
        <a
          class="nav-cta"
          href="/"
          :tabindex="navInteractive ? 0 : -1"
          @click="onGetStartedClick"
        >
          Get Started
        </a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: fixed;
  z-index: 40;
  inset: 0 0 auto;
  height: var(--header-h);
  display: grid;
  align-items: center;
  color: var(--paper);
  background: transparent;
  transform: translateZ(0);
  transition: background-color 220ms ease, color 220ms ease, box-shadow 220ms ease;
}

.site-header.is-scrolled {
  color: var(--ink);
  background: #fff;
  box-shadow: 0 1px 0 var(--line);
}

.header-inner {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.brand {
  display: inline-flex;
  align-items: center;
  min-width: 0;
}

.brand-logos {
  position: relative;
  display: block;
  height: 4.35rem;
  width: min(68vw, 16rem);
}

.brand-logo {
  display: block;
  height: 4.35rem;
  width: auto;
  max-width: min(68vw, 16rem);
  object-fit: contain;
  object-position: left center;
}

.brand-logo-dark {
  position: absolute;
  inset: 0 auto 0 0;
  opacity: 0;
  transition: opacity 220ms ease;
}

.brand-logo-light {
  transition: opacity 220ms ease;
}

.site-header.is-scrolled .brand-logo-light {
  opacity: 0;
}

.site-header.is-scrolled .brand-logo-dark {
  opacity: 1;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.nav-toggle {
  display: none;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.45rem;
  color: inherit;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 220ms ease, visibility 220ms ease, background-color 160ms ease;
}

.site-header.nav-visible .nav-toggle {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

.nav-toggle:hover {
  background: rgba(20, 26, 22, 0.06);
}

.site-nav {
  display: flex;
  align-items: center;
  gap: 1.35rem;
  font-size: 0.92rem;
  font-weight: 600;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transform: translateY(-6px);
  transition:
    opacity 220ms ease,
    transform 220ms ease,
    visibility 220ms ease;
}

.site-header.nav-visible .site-nav {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transform: translateY(0);
}

.site-nav a {
  color: inherit;
}

.site-nav a:hover,
.site-nav a.router-link-active {
  color: var(--green);
}

.site-header.is-scrolled .site-nav a.router-link-active,
.site-header.is-scrolled .site-nav a:hover {
  color: var(--green-deep);
}

.nav-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.35rem;
  padding: 0.4rem 1rem;
  margin-left: 0.25rem;
  border-radius: 0.45rem;
  background: var(--green);
  color: var(--ink) !important;
  font-weight: 700;
  letter-spacing: 0.02em;
  transition: background-color 160ms ease, transform 160ms ease;
}

.nav-cta:hover,
.site-header.is-scrolled .nav-cta:hover,
.nav-cta.router-link-active,
.site-header.is-scrolled .nav-cta.router-link-active {
  background: #84e000;
  color: var(--ink) !important;
  transform: translateY(-1px);
}

@media (max-width: 720px) {
  .brand-logos,
  .brand-logo {
    height: 3.5rem;
  }

  .nav-toggle {
    display: inline-flex;
  }

  .site-nav {
    position: absolute;
    top: calc(100% + 0.55rem);
    right: 0;
    left: auto;
    z-index: 50;
    width: min(18rem, calc(100vw - 2 * var(--space)));
    display: grid;
    gap: 0.15rem;
    padding: 0.65rem;
    border: 1px solid var(--line);
    border-radius: 0.75rem;
    background: #fff;
    color: var(--ink);
    box-shadow: var(--shadow-soft);
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transform: translateY(-8px);
  }

  .site-header.nav-visible .site-nav {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transform: translateY(-8px);
  }

  .site-header.menu-open .site-nav {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transform: translateY(0);
  }

  .site-nav a {
    display: flex;
    align-items: center;
    min-height: 2.65rem;
    padding: 0.55rem 0.85rem;
    border-radius: 0.45rem;
    font-size: 0.95rem;
  }

  .site-nav a:hover,
  .site-nav a.router-link-active {
    background: var(--soft);
    color: var(--green-deep);
  }

  .nav-cta {
    margin: 0.35rem 0 0;
    justify-content: center;
    min-height: 2.75rem;
    width: 100%;
  }

  .nav-cta:hover,
  .site-header.is-scrolled .nav-cta:hover {
    transform: none;
  }
}
</style>

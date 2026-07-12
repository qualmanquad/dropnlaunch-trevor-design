<script setup>
import { computed, onUnmounted, ref, watch } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  value: { type: [Number, String], required: true },
  unit: { type: String, default: '' },
  delay: { type: Number, default: 0 },
  fill: { type: Number, default: 0.72 },
  /** Parent sets true when HUD row enters the viewport */
  active: { type: Boolean, default: false },
})

const numeric = computed(() => typeof props.value === 'number')
const display = ref(numeric.value ? 0 : '')
const barWidth = ref(0)
const played = ref(false)

let rafId
let startTime
let delayTimer

function easeOutCubic(t) {
  return 1 - (1 - t) ** 3
}

function animateCount(timestamp) {
  if (startTime == null) startTime = timestamp
  const elapsed = timestamp - startTime
  const duration = 1200
  const progress = Math.min(elapsed / duration, 1)
  const eased = easeOutCubic(progress)

  if (numeric.value) {
    display.value = Math.round(eased * Number(props.value))
  }
  barWidth.value = Math.round(eased * props.fill * 100)

  if (progress < 1) {
    rafId = requestAnimationFrame(animateCount)
  } else {
    display.value = props.value
    barWidth.value = Math.round(props.fill * 100)
  }
}

function startAnimation() {
  if (played.value) return
  played.value = true

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion) {
    display.value = props.value
    barWidth.value = Math.round(props.fill * 100)
    return
  }

  if (!numeric.value) display.value = props.value
  else display.value = 0
  barWidth.value = 0
  startTime = undefined

  delayTimer = window.setTimeout(() => {
    rafId = requestAnimationFrame(animateCount)
  }, props.delay)
}

watch(
  () => props.active,
  (isActive) => {
    if (isActive) startAnimation()
  },
  { immediate: true },
)

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId)
  if (delayTimer) window.clearTimeout(delayTimer)
})
</script>

<template>
  <div
    class="hud-chip"
    :class="{ 'is-active': active }"
    :style="{ '--hud-delay': `${delay}ms`, '--hud-fill': `${barWidth}%` }"
  >
    <span class="hud-corner hud-corner-tl" aria-hidden="true"></span>
    <span class="hud-corner hud-corner-tr" aria-hidden="true"></span>
    <span class="hud-corner hud-corner-bl" aria-hidden="true"></span>
    <span class="hud-corner hud-corner-br" aria-hidden="true"></span>
    <span class="hud-ticks hud-ticks-l" aria-hidden="true"></span>
    <span class="hud-ticks hud-ticks-r" aria-hidden="true"></span>

    <div class="hud-body">
      <span class="hud-label">{{ label }}</span>
      <span class="hud-value">
        <span class="hud-number">{{ display }}</span>
        <span v-if="unit" class="hud-unit">{{ unit }}</span>
      </span>
      <span class="hud-meter" aria-hidden="true">
        <span class="hud-meter-fill"></span>
      </span>
    </div>
  </div>
</template>

<style scoped>
.hud-chip {
  --hud-accent: #76ce00;

  position: relative;
  width: 100%;
  min-height: 6.5rem;
  color: #fff;
  background: rgba(8, 14, 10, 0.88);
  border: 1.5px solid var(--hud-accent);
  box-shadow:
    0 0 0 1px rgba(118, 206, 0, 0.15),
    0 8px 24px rgba(0, 0, 0, 0.28);
  clip-path: polygon(
    12px 0,
    calc(100% - 12px) 0,
    100% 12px,
    100% calc(50% - 8px),
    calc(100% - 6px) 50%,
    100% calc(50% + 8px),
    100% calc(100% - 12px),
    calc(100% - 12px) 100%,
    12px 100%,
    0 calc(100% - 12px),
    0 calc(50% + 8px),
    6px 50%,
    0 calc(50% - 8px),
    0 12px
  );
  opacity: 0;
  transform: translateY(22px) scale(0.94);
}

.hud-chip.is-active {
  animation: hud-enter 680ms cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: var(--hud-delay);
}

.hud-corner {
  position: absolute;
  width: 14px;
  height: 14px;
  border-color: var(--hud-accent);
  border-style: solid;
  pointer-events: none;
}

.hud-corner-tl {
  top: 4px;
  left: 4px;
  border-width: 2px 0 0 2px;
}

.hud-corner-tr {
  top: 4px;
  right: 4px;
  border-width: 2px 2px 0 0;
}

.hud-corner-bl {
  bottom: 4px;
  left: 4px;
  border-width: 0 0 2px 2px;
}

.hud-corner-br {
  bottom: 4px;
  right: 4px;
  border-width: 0 2px 2px 0;
}

.hud-ticks {
  position: absolute;
  top: 50%;
  width: 7px;
  height: 34px;
  transform: translateY(-50%);
  background:
    linear-gradient(to bottom, var(--hud-accent) 0 2px, transparent 2px 6px) 0 0 / 100% 8px repeat-y;
  opacity: 0.9;
  pointer-events: none;
}

.hud-ticks-l {
  left: 3px;
}

.hud-ticks-r {
  right: 3px;
}

.hud-body {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 0.3rem;
  height: 100%;
  min-height: inherit;
  padding: 0.95rem 1.15rem 0.9rem;
  box-sizing: border-box;
}

.hud-label {
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #fff;
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.45);
}

.hud-value {
  display: flex;
  align-items: baseline;
  gap: 0.3rem;
  min-height: 1em;
  font-family: var(--font-display);
  font-size: clamp(2.05rem, 4.4vw, 2.95rem);
  letter-spacing: 0.02em;
  line-height: 0.9;
  color: #fff;
  text-shadow: 0 2px 16px rgba(0, 0, 0, 0.4);
}

.hud-unit {
  font-size: 0.4em;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.9);
}

.hud-meter {
  display: block;
  margin-top: auto;
  height: 7px;
  border: 1px solid var(--hud-accent);
  background: rgba(0, 0, 0, 0.35);
  box-shadow: 0 0 10px rgba(118, 206, 0, 0.25);
  overflow: hidden;
}

.hud-meter-fill {
  display: block;
  width: var(--hud-fill, 0%);
  height: 100%;
  background: var(--hud-accent);
  box-shadow: 0 0 12px rgba(118, 206, 0, 0.85);
  transition: none;
}

@keyframes hud-enter {
  from {
    opacity: 0;
    transform: translateY(22px) scale(0.94);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (max-width: 640px) {
  .hud-chip {
    min-height: 5.6rem;
  }

  .hud-body {
    padding: 0.75rem 0.9rem 0.75rem;
  }

  .hud-label {
    font-size: 0.62rem;
    letter-spacing: 0.1em;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hud-chip {
    opacity: 1;
    transform: none;
  }

  .hud-chip.is-active {
    animation: none;
  }
}
</style>

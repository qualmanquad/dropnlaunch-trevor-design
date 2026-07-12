<script setup>
</script>

<template>
  <div class="about-page">
    <section class="section about-hero" aria-labelledby="about-title">
      <div class="wrap about-hero-inner">
        <div class="about-intro">
          <p class="section-kicker">About us</p>
          <h1 id="about-title" class="section-title about-title">
            Where swing data meets game-changing results.
          </h1>
          <p class="section-lead">
            Drop N Launch started with a simple idea: every player deserves real-time feedback —
            not just pros, and not just in elite facilities.
          </p>
        </div>

        <figure class="about-photo">
          <img
            src="/assets/about-founders.webp"
            alt="Drop N Launch founder and his son smiling together on a baseball field"
            width="800"
            height="1067"
          />
        </figure>
      </div>
    </section>

    <section class="section about-story" aria-label="Our story">
      <div class="wrap about-story-inner">
        <p>
          At Drop N Launch, we believe data-driven training can transform how athletes learn and
          improve. The idea came from a simple but powerful moment — one that changed how I
          approach coaching and player development.
        </p>

        <p>
          Growing up in Hawaii, baseball wasn’t just a sport — it was woven into the fabric of my
          childhood. The smell of fresh-cut grass, the crack of the bat, and the late evenings
          spent playing weren’t just memories. They were moments that shaped me. Baseball taught
          me patience, hard work, and the joy of getting just a little better every day.
        </p>

        <p>
          Now, as a baseball dad and coach, I strive to pass those same lessons to my son and the
          youth teams I coach. I want to teach the right mechanics, but I also know the best
          learning happens when kids figure things out for themselves. Sometimes, all it takes is
          one moment of real-time feedback to make everything click.
        </p>

        <blockquote>
          <p>
            One day, while hitting in our garage golf simulator, I encouraged my son to try a new
            swing adjustment. Like many young athletes, he was hesitant — it felt awkward. But I
            convinced him to take just one swing.
          </p>
          <p class="about-highlight">
            His exit velocity jumped 4 mph higher than ever before.
          </p>
          <p>
            That instant feedback clicked for him in a way words alone never could. He saw the
            results, and just like that, he was all in.
          </p>
        </blockquote>

        <p>
          That moment sparked an idea: what if every player had access to real-time swing data?
          Seeing how instant feedback fueled my son’s motivation, I knew a portable, affordable
          launch monitor system could help thousands of players and coaches just like us. Using my
          love for baseball and my background in software development, I created Drop N Launch to
          make that vision a reality.
        </p>

        <p>
          Drop N Launch isn’t just about training — it’s about making practice fun. Whether it’s
          Home Run Derby or batting practice on a virtual field, players get lost in the
          competition, and before they realize it, they’ve taken an extra 200 reps.
        </p>

        <p>
          That’s why we built Drop N Launch — a powerful yet accessible tool that brings
          professional-level swing analytics to any field, cage, garage, or backyard. Whether
          you’re a player looking to improve, a coach guiding a team, or a parent supporting your
          athlete’s journey, Drop N Launch delivers the data-driven insights you need to refine
          mechanics, track progress, and unlock potential.
        </p>

        <p class="about-signoff">
          Ignore the bunt sign. Just Drop N Launch.
        </p>

        <div class="about-actions">
          <RouterLink class="button button-primary" :to="{ path: '/', hash: '#download' }">
            Get the app
          </RouterLink>
          <RouterLink class="button button-ghost" to="/get-started">Getting Started Guide</RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-hero {
  padding-top: calc(var(--header-h) + 3rem);
  background: linear-gradient(180deg, var(--soft), var(--paper));
}

.about-hero-inner {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.85fr);
  gap: clamp(2rem, 5vw, 4rem);
  align-items: center;
}

.about-title {
  max-width: 12ch;
}

.about-photo {
  margin: 0;
  overflow: hidden;
  border: 1px solid var(--line);
  background: var(--green-soft);
  box-shadow: var(--shadow-soft);
}

.about-photo img {
  width: 100%;
  height: 100%;
  max-height: 36rem;
  object-fit: cover;
  object-position: center top;
  display: block;
}

.about-story {
  background: var(--paper);
  padding-top: clamp(2.5rem, 5vw, 3.5rem);
}

.about-story-inner {
  max-width: 44rem;
}

.about-story-inner p {
  margin: 0 0 1.25rem;
  color: var(--muted);
  font-size: 1.08rem;
  line-height: 1.65;
}

.about-story-inner blockquote {
  margin: 1.75rem 0 2rem;
  padding: 1.35rem 1.5rem;
  border-left: 4px solid var(--green);
  background: var(--soft);
}

.about-story-inner blockquote p {
  margin-bottom: 0.9rem;
  color: var(--ink);
}

.about-story-inner blockquote p:last-child {
  margin-bottom: 0;
}

.about-highlight {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 4vw, 2.4rem);
  letter-spacing: 0.02em;
  line-height: 1;
  color: var(--green-deep) !important;
}

.about-signoff {
  margin-top: 2rem !important;
  color: var(--ink) !important;
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  letter-spacing: 0.02em;
  line-height: 1.05;
}

.about-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-top: 2rem;
}

@media (max-width: 800px) {
  .about-hero-inner {
    grid-template-columns: 1fr;
  }

  .about-photo {
    order: -1;
    max-width: 28rem;
  }

  .about-photo img {
    max-height: 28rem;
  }
}
</style>

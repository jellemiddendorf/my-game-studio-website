<script setup lang="ts">
// We import the types we defined in projects.ts
// so TypeScript knows exactly what shape a project object is
import type { Project } from '../data/projects';
import { statusLabel } from '../data/projects';

defineProps<{
  project: Project;
}>();
</script>

<template>
  <article class="flip-card" :aria-label="project.title">
    <div class="flip-card__inner">

      <!-- FRONT -->
      <div class="flip-card__face flip-card__front">
        <div class="front-image-wrap">
          <img
            :src="project.image"
            :alt="`${project.title} screenshot`"
            class="front-image"
            loading="lazy"
          />
          <span class="status-badge" :data-status="project.status">
            {{ statusLabel[project.status] }}
          </span>
        </div>

        <div class="front-meta">
          <h3 class="front-title">{{ project.title }}</h3>
          <p class="front-tagline">{{ project.tagline }}</p>
          <!-- <span class="flip-hint" aria-hidden="true">hover to explore →</span> -->
        </div>
      </div>

      <!-- BACK -->
      <div class="flip-card__face flip-card__back">
        <div class="back-content">
          <div>
            <p class="back-engine">{{ project.engine }} · {{ project.year }}</p>
            <h3 class="back-title">{{ project.title }}</h3>
            <p class="back-description">{{ project.description }}</p>

            <ul class="back-tags">
              <li v-for="tag in project.tags" :key="tag" class="back-tag">
                {{ tag }}
              </li>
            </ul>
          </div>

          <div class="back-links">
            <a v-if="project.links.steam"   :href="project.links.steam"   target="_blank" rel="noopener" class="btn btn-accent">Steam ↗</a>
            <a v-if="project.links.itch"    :href="project.links.itch"    target="_blank" rel="noopener" class="btn">itch.io ↗</a>
            <a v-if="project.links.github"  :href="project.links.github"  target="_blank" rel="noopener" class="btn">GitHub ↗</a>
            <a v-if="project.links.trailer" :href="project.links.trailer" target="_blank" rel="noopener" class="btn">Trailer ↗</a>
          </div>
        </div>
      </div>

    </div>
  </article>
</template>

<style scoped>
/* ─── Container ──────────────────────────────── */
.flip-card {
  aspect-ratio: 3 / 4;
  perspective: 1000px;
  cursor: pointer;
}

.flip-card__inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}

.flip-card:hover .flip-card__inner,
.flip-card:focus-within .flip-card__inner {
  transform: rotateY(180deg);
}

.flip-card__face {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border: 1px solid var(--border);
  overflow: hidden;
}

/* ─── FRONT ──────────────────────────────────── */
.flip-card__front {
  background: var(--bg-card);
  display: flex;
  flex-direction: column;
}

.front-image-wrap {
  position: relative;
  flex: 1;
  overflow: hidden;
}

.front-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.55s ease;
  opacity: 0.85;
}

.flip-card:hover .front-image {
  transform: scale(1.04);
  opacity: 1;
}

.status-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-family: var(--font-body);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 0.25em 0.6em;
  border: 1px solid var(--accent-dim);
  background: var(--accent-dim);
  /* background: rgba(26, 48, 64, 0.7); */
  color: var(--accent);
}

.status-badge[data-status="released"] {
  border-color: var(--accent-dark);
  background: var(--accent-dim);
  /* background: rgba(26, 48, 64, 0.9); */
  color: var(--accent);
}

.front-meta {
  padding: 1.25rem;
  border-top: 1px solid var(--border);
}

.front-title {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  /* font-size: 1.3rem; */
  font-weight: 400;
  color: var(--ink);
  margin-bottom: 0.25rem;
}

.front-tagline {
  font-size: var(--text-base);
  /* font-size: 0.75rem; */
  color: var(--ink-soft);
  line-height: 1.5;
}

.flip-card:hover .flip-hint { opacity: 1; }

/* ─── BACK ───────────────────────────────────── */
.flip-card__back {
  background: var(--bg-raised);
  color: var(--ink);
  transform: rotateY(180deg);
  display: flex;
  border-color: var(--accent-dim);
}

.back-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.back-engine {
  font-size: var(--text-xs);
  /* font-size: 0.65rem; */
  color: var(--accent);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 0.4rem;
}

.back-title {
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 400;
  color: var(--ink);
  margin-bottom: 0.75rem;
}

.back-description {
  font-size: var(--text-base);
  /* font-size: 0.8rem; */
  line-height: 1.7;
  color: var(--ink-soft);
  margin-bottom: 1.25rem;
}

.back-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  list-style: none;
  margin-bottom: 1.25rem;
}

.back-tag {
  font-size: var(--text-xs);
  /* font-size: 0.6rem; */
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border: 1px solid var(--border);
  padding: 0.2em 0.5em;
  color: var(--ink-muted);
}

.back-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.back-links .btn {
  font-size: 0.7rem;
  border-color: var(--btn-border);
  color: var(--ink-soft);
}

.back-links .btn:hover {
  border-color: var(--ink);
  color: var(--ink);
  background: transparent;
}

.back-links .btn-accent {
  border-color: var(--accent-dark);
  color: var(--accent);
  background: transparent;
}

.back-links .btn-accent:hover {
  background: var(--accent-dim);
}
</style>
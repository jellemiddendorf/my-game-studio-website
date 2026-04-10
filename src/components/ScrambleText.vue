<script setup lang="ts">
// This is the Vue "Composition API" style — modern Vue 3.
// script setup means everything you declare here is automatically
// available in the template below. No need to return anything.

import { ref, onMounted } from 'vue';

// Props — what the parent page passes in to this component
const props = withDefaults(defineProps<{
  text: string;    // the final text to display
  delay?: number;  // ms to wait before starting
  speed?: number;  // ms per frame (lower = faster)
}>(), {
  delay: 0,
  speed: 40,
});

// Characters to cycle through while scrambling
const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';

// ref() is Vue's reactivity system — when this changes, the template re-renders
const displayed = ref('');

function randomChar(): string {
  return CHARSET[Math.floor(Math.random() * CHARSET.length)];
}

// onMounted runs once, after the component appears in the browser
onMounted(() => {
  setTimeout(() => {
    const target = props.text;
    let frame = 0;
    const ITERS_PER_CHAR = 8; // scramble frames before each char locks in
    const totalFrames = target.length * ITERS_PER_CHAR;

    const interval = setInterval(() => {
      const lockedCount = Math.floor(frame / ITERS_PER_CHAR);

      displayed.value =
        // Characters that have locked — show real text
        target.slice(0, lockedCount) +
        // Characters still scrambling — show random
        Array.from({ length: target.length - lockedCount }, (_, i) =>
          target[lockedCount + i] === ' ' ? ' ' : randomChar()
        ).join('');

      frame++;
      if (frame > totalFrames) {
        displayed.value = target;
        clearInterval(interval);
      }
    }, props.speed);
  }, props.delay);
});
</script>

<template>
  <!-- aria-label gives screen readers the real text immediately
       so the scramble animation doesn't confuse them -->
  <span class="scramble" :aria-label="text" aria-live="off">
    {{ displayed }}
  </span>
</template>

<style scoped>
.scramble {
  /* Mono font is essential here — proportional fonts would make
     the text jump around as different-width characters swap in */
  font-family: var(--font-body);
}
</style>
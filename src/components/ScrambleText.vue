<script setup lang="ts">

import { ref, onMounted } from 'vue';

const props = withDefaults(defineProps<{
  text: string;
  delay?: number;
  speed?: number;
}>(), {
  delay: 0,
  speed: 40,
});

const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';

const displayed = ref('');

function randomChar(): string {
  return CHARSET[Math.floor(Math.random() * CHARSET.length)];
}

onMounted(() => {
  setTimeout(() => {
    const target = props.text;
    let frame = 0;
    const ITERS_PER_CHAR = 8;
    const totalFrames = target.length * ITERS_PER_CHAR;

    const interval = setInterval(() => {
      const lockedCount = Math.floor(frame / ITERS_PER_CHAR);

      displayed.value =
        target.slice(0, lockedCount) +
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
  <span class="scramble" :aria-label="text" aria-live="off">
    {{ displayed }}
  </span>
</template>

<style scoped>
.scramble {
  font-family: inherit;
  /* font-family: var(--font-body); */
}
</style>
<script setup lang="ts">
import { ref, onMounted } from 'vue';

const props = withDefaults(defineProps<{
  text: string;
  delay?: number;
  speed?: number;
  scrambleSteps?: number;
  lookahead?: number;
}>(), {
  delay: 0,
  speed: 50,
  scrambleSteps: 6,
  lookahead: 2,
});

const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const displayed = ref('');

function randomChar(): string {
  return CHARSET[Math.floor(Math.random() * CHARSET.length)];
}

onMounted(() => {
  setTimeout(() => {
    const target = props.text;
    let charIndex = 0;
    let scrambleCount = 0;

    const interval = setInterval(() => {
      if (charIndex >= target.length) {
        displayed.value = target;
        clearInterval(interval);
        return;
      }

      if (scrambleCount < props.scrambleSteps) {
        // Locked characters + lookahead characters scrambling ahead
        const ahead = Array.from({ length: props.lookahead }, (_, i) => {
          const char = target[charIndex + i];
          if (char === undefined) return '';
          return char === ' ' ? ' ' : randomChar();
        }).join('');

        displayed.value = target.slice(0, charIndex) + ahead;
        scrambleCount++;
      } else {
        displayed.value = target.slice(0, charIndex + 1);
        charIndex++;
        scrambleCount = 0;
      }
    }, props.speed);
  }, props.delay);
});
</script>

<template>
  <span :aria-label="text" aria-live="off">{{ displayed }}</span>
</template>


<!-- <script setup lang="ts">
import { ref, onMounted } from 'vue';

const props = withDefaults(defineProps<{
  text: string;
  delay?: number;
  speed?: number;
  scrambleSteps?: number;
}>(), {
  delay: 0,
  speed: 50,
  scrambleSteps: 6,
});

const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const displayed = ref('');

function randomChar(): string {
  return CHARSET[Math.floor(Math.random() * CHARSET.length)];
}

onMounted(() => {
  setTimeout(() => {
    const target = props.text;
    let charIndex = 0;
    let scrambleCount = 0;

    const interval = setInterval(() => {
      if (charIndex >= target.length) {
        displayed.value = target;
        clearInterval(interval);
        return;
      }

      // Scramble the current character a few times before locking
      if (scrambleCount < props.scrambleSteps) {
        const current = target[charIndex];
        displayed.value =
          target.slice(0, charIndex) +
          (current === ' ' ? ' ' : randomChar());
        scrambleCount++;
      } else {
        // Lock this character and move to next
        displayed.value = target.slice(0, charIndex + 1);
        charIndex++;
        scrambleCount = 0;
      }
    }, props.speed);
  }, props.delay);
});
</script>

<template>
  <span :aria-label="text" aria-live="off">{{ displayed }}</span>
</template> -->
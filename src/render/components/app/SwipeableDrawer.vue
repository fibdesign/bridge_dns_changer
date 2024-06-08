<template>
  <transition name="slide-right">
    <aside v-if="status" class="drawer" ref="aside" v-touch:swipe.right="closeDrawer">
      <slot/>
    </aside>
  </transition>
</template>

<script setup lang="ts">
import {ref} from "vue";

defineProps<{
  status: boolean
}>()
const aside = ref(null)
const emit = defineEmits(['close'])
const closeDrawer = () => {
  emit('close')
}
</script>

<style scoped lang="scss">
.slide-right{
  &-enter-active,
  &-leave-active {
    transition: all 0.5s ease;
  }

  &-enter-from,
  &-leave-to {
    transform: translateX(100%);
    @media screen and (min-width: 640px){
      transform: translateX(calc(120%));
    }
  }
}

.drawer{
  background-color: var(--paper);
  position: fixed;
  right: 0;
  user-select: none;
  top: 0;
  height: 100%;
  width: clamp(300px, 30vw, 400px);
  @media screen and (max-width: 641px){
    width: 90%;
  }
  padding: 1rem;
  border-inline: solid 1px var(--divider);
  z-index: 5;
}
</style>
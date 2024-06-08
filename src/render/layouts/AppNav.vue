<template>
  <nav class="row-a space p-1">
    <button class="icon" @click="open">
      <iconify-icon icon="ion:grid-outline"/>
    </button>
    <p>{{ $t('app.name') }}</p>
    <button class="icon" title="حمایت مالی">
      <iconify-icon icon="ion:heart" class="f-danger"/>
    </button>
  </nav>
</template>

<script setup lang="ts">
import IconifyIcon from "@/render/components/app/IconifyIcon.vue";
import useAppStore from '@/render/store/AppStore'

const store = useAppStore()

const open = () => {
  store.toggleDrawer(true)
}
</script>

<style scoped lang="scss">

.icon{
  padding: unset;
  background-color: var(--paper);
  border-radius: 5px;
  aspect-ratio: 1;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
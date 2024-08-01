<template>
  <router-link :to="useLocalization.i18nRoute(to)">
    <slot/>
  </router-link>
</template>

<script setup lang="ts">

import useLocalization from "@/render/services/useLocalization";

defineProps<{to:any}>()
</script>

<style scoped lang="scss">

</style>
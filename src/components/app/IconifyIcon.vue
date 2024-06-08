<template>
  <div class="row-c" :class="{'flip': rtlClass}"><Icon :icon="icon"/></div>
</template>

<script setup lang="ts">
import {Icon} from "@iconify/vue";
import {computed} from 'vue'
import useLocalization from '@/services/useLocalization'

defineProps(['icon'])

const rtlClass = computed(():boolean => !['fa', 'ar'].includes(useLocalization.currentLocale))

</script>

<style scoped lang="scss">
.flip{
  transform: scaleX(-1);
}
</style>
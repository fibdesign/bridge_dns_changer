<template>
  <div class="App" :class="`${theme} ${rtlClass}`" :dir="rtlClass ? 'rtl' : 'ltr'">
    <app-nav/>
    <app-drawer/>
    <main>
      <router-view/>
    </main>
    <app-footer/>
  </div>
</template>
<script setup lang="ts">
import AppNav from "@/render/layouts/AppNav.vue";
import AppDrawer from "@/render/layouts/AppDrawer.vue";
import {useI18n} from "vue-i18n";
import useAppStore from "@/render/store/AppStore";
import {storeToRefs} from "pinia";
import {computed} from "vue";
import AppFooter from "@/render/layouts/AppFooter.vue";

const {locale} = useI18n()
const store = useAppStore()
const {theme} = storeToRefs(store)

const rtlClass = computed(() => ['fa', 'ar'].includes(locale.value) ? 'persianFont' : '')

</script>
<style lang="scss" scoped>
main{
  min-height: calc(700px - 70px - 60px - 20px);
}
</style>

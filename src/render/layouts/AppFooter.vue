<template>
  <footer class="app-bg-paper row-a space-around pt-1">
    <locale-link v-for="(item,index) in FooterLinksUtils"
                 :key="index"
                 :to="item.to"
                 class="f-center column-c">
      <iconify-icon :icon="item.icon"/>
      <p>{{ $t(item.title) }}</p>
    </locale-link>
  </footer>
</template>

<script setup lang="ts">
import IconifyIcon from "@/render/components/app/IconifyIcon.vue";
import FooterLinksUtils from "@/render/utils/data/FooterLinksUtils";
import LocaleLink from "@/render/components/app/LocaleLink.vue";
</script>

<style scoped lang="scss">
footer{
  position: sticky;
  bottom: 0;
  inset-inline: 0;
}
</style>
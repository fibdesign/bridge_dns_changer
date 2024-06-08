<template>
  <swipeable-drawer :status="showDrawer" @close="close">

    <div class="row-a gap pointer">
      <img @click="openLink()" src="/images/logo.png" alt="logo" style="max-width: 40px">
      <div @click="openLink()">
        <p class="h6 text-bold">{{ $t('app.name') }}</p>
        <p class="app-text-secondary subtitle">
          گروه نرم افزاری فیبوناچی
        </p>
      </div>
      <iconify-icon icon="ion:close" class="ms-auto" @click="close"/>
    </div>
    <ul class="nav-links rm-padding rm-margin">
      <li v-for="(link,index) in NavbarLinksUtils" :key="index">
        <hr class="m-1-0">
        <div  @click="openLink(link.to)" class="row-a gap pointer">
          <iconify-icon icon="ion:open-outline"/>
          <p class="text-small">{{ $t(link.title) }}</p>
        </div>
      </li>
    </ul>
  </swipeable-drawer>
</template>

<script setup lang="ts">
import SwipeableDrawer from '@/components/app/SwipeableDrawer.vue'
import useAppStore from '@/store/AppStore'
import {storeToRefs} from 'pinia'
import NavbarLinksUtils from '@/utils/data/NavbarLinksUtils'
import IconifyIcon from '@/components/app/IconifyIcon.vue'


const store = useAppStore()
const {showDrawer} = storeToRefs(store)

const close = () => {
  store.toggleDrawer(false)
}

const openLink = (link:string = 'https://fibdesign.ir') => {
  (window as any).ipcRenderer.send('open-link', link)
}
</script>

<style scoped lang="scss">

.subtitle{
  font-size: 0.7rem;
  line-height: 0.5rem;
}
</style>
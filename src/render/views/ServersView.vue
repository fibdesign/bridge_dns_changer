<template>
  <div class="p-1">
    <div v-if="servers" >
      <p class="text-bold">لیست سرور‌ها</p>
      <div class="row-a gap">
        <div
             @click="currentCat = undefined"
             class="app-bg-paper p-1-3 text-small pointer round-50"
        :class="{'app-bg-primary f-dark': currentCat === undefined}">
          همه
        </div>
        <div v-for="(type,index) in ['Gaming' , 'AI']"
             :key="index"
             @click="currentCat = currentCat === type ? undefined : type"
             class="app-bg-paper p-1-3 text-small pointer round-50"
             :class="{'app-bg-primary f-dark': currentCat === type}">
          {{ type }}
        </div>
      </div>
      <div v-for="(server,index) in !currentCat ? servers : servers.filter(_s => _s.types?.includes(currentCat!))" :key="server.id" class="mt-1">
        <div class="divider-border round-10 p-1 row-a gap box pointer" @click="setServer(server.id)">
          <img :src="server.image"
               class="dns-logo"
               :alt="server.title">

          <div>
            <p>{{ server.title }}</p>
            <p class="app-text-secondary subtitle">
              {{ server.dns1 }} - {{ server?.dns2 }}
            </p>
          </div>

          <iconify-icon icon="ion:chevron-left" class="ms-auto"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import useServersStore from "@/render/store/ServersStore";
import {storeToRefs} from "pinia";
import IconifyIcon from "@/render/components/app/IconifyIcon.vue";
import {EVENTS_KEYS} from "@/electron/utils/EVENTS_KEYS";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";

const serversStore = useServersStore()
const {servers} = storeToRefs(serversStore)

const currentCat = ref<any>()

const router = useRouter()
const setServer = (id: number) => {
  serversStore.selectServer(id);
  (window as any).ipcRenderer.send(EVENTS_KEYS.CLEAR_DNS)
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
  })
}

onMounted(async () => {
  serversStore.getServers();
})
</script>

<style scoped lang="scss">

.box{
  transition: 0.2s ease-in-out;
  &:hover{
    background-color: var(--primary-color);
    *{
      color: var(--primary-color-text)!important;
    }
  }
}
.dns-logo{
  width: 30px;
  height: 30px;
  object-fit: contain;
}
.subtitle{
  font-size: 0.7rem;
  line-height: 0.5rem;
}
</style>
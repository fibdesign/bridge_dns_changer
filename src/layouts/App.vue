<template>
  <div class="App" :class="`${theme} ${rtlClass}`" :dir="rtlClass ? 'rtl' : 'ltr'">
    <app-nav/>
    <app-drawer/>
    <div class="p-1 column ">
      <div class="row-c mt-2">
        <active-button :is-active="active" @click="activate"/>
      </div>
      <div v-if="selectedServer" class="app-bg-paper round-10 p-2 row-a gap m-2-0">
        <img :src="selectedServer.image"
             class="dns-logo"
             alt="shecan">

        <div>
          <p>{{ selectedServer.title }}</p>
          <p class="app-text-secondary subtitle">
             {{ selectedServer.dns1 }} - {{ selectedServer?.dns2 }}
          </p>
        </div>

      </div>

      <div v-if="servers">
        <p>لیست سرور‌ها</p>
        <div v-for="(server,index) in servers" :key="server.id" class="mt-1">
          <div class="divider-border round-10 p-2 row-a gap box pointer" @click="setServer(server.id)">
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
  </div>
</template>
<script setup lang="ts">
import AppNav from "@/layouts/AppNav.vue";
import AppDrawer from "@/layouts/AppDrawer.vue";
import { useI18n } from "vue-i18n";
import useAppStore from "@/store/AppStore";
import {storeToRefs} from "pinia";
import {computed, onMounted, ref} from "vue";
import IconifyIcon from "@/components/app/IconifyIcon.vue";
import ActiveButton from "@/components/ActiveButton.vue";
import useServersStore from "@/store/ServersStore";

const {locale} = useI18n()
const store = useAppStore()
const {theme} = storeToRefs(store)

const serversStore = useServersStore()
const {selectedServer, servers} = storeToRefs(serversStore)

const rtlClass = computed(() => ['fa', 'ar'].includes(locale.value) ? 'persianFont' : '')
const active = ref(false)

const activate = () => {
  if (active.value){
    (window as any).ipcRenderer.send('clear-dns')
    active.value = false
  }else{
    (window as any).ipcRenderer.send('change-dns', {
      primaryDns: selectedServer.value?.dns1 ?? '',
      secondaryDns: selectedServer.value?.dns2 ?? ''
    });
    active.value = true
  }
}

const setServer = (id: number) => {
  serversStore.selectServer(id);
  (window as any).ipcRenderer.send('clear-dns')
  active.value = false
  window.scrollTo(0, 0);
}

onMounted(() => {
  serversStore.getServers()
})
</script>
<style lang="scss">
:root{
  scroll-behavior: smooth;
}
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
.column{
  min-height: calc(700px - 70px - 20px);
}

</style>

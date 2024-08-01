<template>
  <div class="p-1 column ">
    <div class="row-c mt-2">
      <active-button :is-active="active" @click="activate" :loading="loading"/>
    </div>
    <div class="app-text-secondary text-small f-center m-1-0">
      بعد از فعال یا غیر فعال کردن، می‌توانید برنامه را کامل ببندید.
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
    <label>
      <span class="text-small">نوع آداپتور</span>
      <select class="app-bg-paper round-10 p-2 m-1-0 w-100 borderless" v-model="adapter">
        <option v-for="adapter in adapters" :value="adapter">{{adapter}}</option>
      </select>
    </label>
  </div>
</template>

<script setup lang="ts">
import {storeToRefs} from "pinia";
import {onMounted, ref} from "vue";
import IconifyIcon from "@/render/components/app/IconifyIcon.vue";
import ActiveButton from "@/render/components/ActiveButton.vue";
import useServersStore from "@/render/store/ServersStore";
import {EVENTS_KEYS} from "@/electron/utils/EVENTS_KEYS";


const serversStore = useServersStore()
const {selectedServer, servers} = storeToRefs(serversStore)

const active = ref(false)
const loading = ref(false)
const adapters = ref(['Wi-Fi'])
const adapter = ref('Wi-Fi')

const activate = async () => {
  if (active.value){
    (window as any).ipcRenderer.send(EVENTS_KEYS.CLEAR_DNS)
    active.value = false
  }else{
    (window as any).ipcRenderer.send(EVENTS_KEYS.CHANGE_DNS, {
      primaryDns: selectedServer.value?.dns1 ?? '',
      secondaryDns: selectedServer.value?.dns2 ?? '',
      adaptor: adapter.value
    });
    active.value = true
  }
}

const checkCurrentDns = async () => {
  try {
    const res = await (window as any).ipcRenderer.invoke(EVENTS_KEYS.CHECK_DNS, 'Wi-Fi');
    const currentDnsServer = servers.value.find(_server => (_server.dns1 == res?.[0] && _server.dns2 == res?.[1]));
    if(currentDnsServer) {
      serversStore.selectServer(currentDnsServer.id);
      active.value = true
    }
  } catch (error) {
    console.error('Error getting DNS:', error);
  }
}

const getAdaptersList = async () => {
  try {
    const res = await (window as any).ipcRenderer.invoke(EVENTS_KEYS.GET_ADAPTERS);
    if(res && res.length > 0){
      adapters.value = res
    }
  } catch (error) {
    console.error('Error getting DNS:', error);
  }
}

onMounted(async () => {
  serversStore.getServers();
  checkCurrentDns()
  getAdaptersList()
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
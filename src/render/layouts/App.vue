<template>
  <div class="App" :class="`${theme} ${rtlClass}`" :dir="rtlClass ? 'rtl' : 'ltr'">
<!--    <app-nav/>-->
    <app-drawer/>
    <about-modal v-model="aboutModal" />
    <main class="row align-stretch">
      <div class="xcol-info-spaced app-bg-paper order-2">
        <servers-view/>
      </div>
      <div class="xcol-body-spaced column p-custom order-1">
        <div class="m-auto">
          <div class="row-c mt-2">
            <active-button :is-active="active" @click="activate" :loading="loading"/>
          </div>
          <div class="app-text-secondary text-small f-center m-1-0">
            بعد از فعال یا غیر فعال کردن، می‌توانید برنامه را کامل ببندید.
          </div>
        </div>
        <div class="row app-bg-paper round-10 currentInfoTable">
          <div class="xcol-2-2">
            <span class="text-small app-text-secondary">سرور</span>
            <div v-if="selectedServer" class="p-1-0 row-a gap">
              <img :src="selectedServer.image" class="dns-logo" alt="shecan">
              <p class="text-small">{{ selectedServer.title }}</p>
            </div>
          </div>
          <div class="xcol-2-2">
            <span class="text-small app-text-secondary">DNS</span>
            <div v-if="selectedServer" class="p-1-0 row-a gap ">
              <p class="text-small">
                {{ selectedServer.dns1 }} <span class="app-text-secondary"> - </span> {{ selectedServer?.dns2 }}
              </p>
            </div>
          </div>
          <div class="xcol-2-2">
            <label>
              <span class="text-small app-text-secondary">نوع آداپتور</span>
              <select class="app-bg-paper round-10 p-1-0 w-100 borderless" v-model="adapter">
                <option v-for="adapter in adapters" :value="adapter">{{adapter}}</option>
              </select>
            </label>
          </div>
          <div class="xcol-2-2">
            <span class="text-small app-text-secondary">IPV6</span>
            <label class="row-a gap text-small p-1-0">
              <iconify-icon v-if="ipv6Loading" icon="line-md:loading-loop" class="h5 ml-1"/>
              <input v-else type="checkbox" class="checkbox" v-model="ipv6" @change="toggleIpv6">
              <span>استفاده از IPV6</span>
            </label>
          </div>
        </div>
        <section class="m-2-0">
          <p class="text-small app-text-secondary mb-1 f-justify">
            در برخی دستگاه‌ها، فعال بودن IPv6 ممکن است مانع از عملکرد صحیح DNS شود. در صورتی که پس از اتصال، DNS عمل نکرد، گزینه IPV6 را غیرفعال کنید. توصیه می‌شود پس از قطع اتصال، مجدداً این گزینه را فعال نمایید تا عملکرد شبکه شما در حالت عادی حفظ شود.
          </p>

        </section>
      </div>
    </main>
  </div>
</template>
<script setup lang="ts">
import AppNav from "@/render/layouts/AppNav.vue";
import AppDrawer from "@/render/layouts/AppDrawer.vue";
import {useI18n} from "vue-i18n";
import useAppStore from "@/render/store/AppStore";
import {storeToRefs} from "pinia";
import {computed, onBeforeMount, onBeforeUnmount, onMounted, ref} from "vue";
import ActiveButton from "@/render/components/ActiveButton.vue";
import useServersStore from "@/render/store/ServersStore";
import {EVENTS_KEYS} from "@/electron/utils/EVENTS_KEYS";
import ServersView from "@/render/views/ServersView.vue";
import IconifyIcon from "@/render/components/app/IconifyIcon.vue";
import AboutModal from "@/render/components/AboutModal.vue";
import type {ProgressInfo} from "electron-updater";

const {locale} = useI18n()
const store = useAppStore()
const {theme} = storeToRefs(store)

const rtlClass = computed(() => ['fa', 'ar'].includes(locale.value) ? 'persianFont' : '')

const serversStore = useServersStore()
const {selectedServer, servers} = storeToRefs(serversStore)

const active = ref(false)
const loading = ref(false)
const adapters = ref(['Wi-Fi'])
const adapter = ref('Wi-Fi')

const activate = async () => {
  if (active.value){
    const error = await (window as any).ipcRenderer.send(EVENTS_KEYS.CLEAR_DNS, adapter.value)
    if (error){return;}
    active.value = false
  }else{
    loading.value = true
    const error = await (window as any).ipcRenderer.invoke(EVENTS_KEYS.CHANGE_DNS, {
      primaryDns: selectedServer.value?.dns1 ?? '',
      secondaryDns: selectedServer.value?.dns2 ?? '',
      adaptor: adapter.value
    });
    loading.value = false
    if (error){return;}
    active.value = true
  }
}

const checkCurrentDns = async () => {
  try {
    const currentAdapter = await (window as any).ipcRenderer.invoke(EVENTS_KEYS.GET_ACTIVE_ADAPTER);
    if (currentAdapter) {
      adapter.value = currentAdapter;
    }
    const res = await (window as any).ipcRenderer.invoke(EVENTS_KEYS.CHECK_DNS, adapter.value);
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

const ipv6 = ref(true)
const ipv6Loading = ref(true)

const toggleIpv6 = async () => {
  ipv6Loading.value = true
  const error = await (window as any).ipcRenderer.invoke(EVENTS_KEYS.TOGGLE_IPV6, {
    adapter: adapter.value,
    enable: ipv6.value
  });
  if (error){
    ipv6.value = !ipv6.value
  }
  ipv6Loading.value = false
}


const getIpv6Status = async () => {
  ipv6Loading.value = true
  const status = await (window as any).ipcRenderer.invoke(EVENTS_KEYS.GET_IPV6_STATUS, adapter.value);
  if (status != null) {
    ipv6.value = status;
  }
  ipv6Loading.value = false
}

onBeforeMount(() => {
  getIpv6Status()
})

const aboutModal = ref(false)
function handleOpenAbout() {
  aboutModal.value = true
}

onMounted(async () => {
  serversStore.getServers();
  checkCurrentDns();
  getAdaptersList();
  (window as any).ipcRenderer.on('open-about-modal', handleOpenAbout)
})
onBeforeUnmount(() => {
  (window as any).ipcRenderer.removeListener('open-about-modal', handleOpenAbout)
})
</script>
<style lang="scss" scoped>
main{
  min-height: 100vh;
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
.align-stretch{
  align-items: stretch;
}
.p-custom{
  padding: 4rem!important;
  @media screen and (max-width: 641px){
    padding: 2rem!important;
  }
}
.currentInfoTable{
  .xcol-2-2 {
    padding: 10px 1rem;
    border: 1px solid rgba(255, 255, 255, 0.04);
  }

  .xcol-2-2:nth-child(odd) {
    border-right: none;
  }

  .xcol-2-2:nth-child(even) {
    border-left: none;
  }

  .xcol-2-2:nth-child(1),
  .xcol-2-2:nth-child(2) {
    border-top: none;
  }

  .xcol-2-2:nth-last-child(-n+2) {
    border-bottom: none;
  }
}


</style>

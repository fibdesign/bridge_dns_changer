<template>
  <div class="App" :class="`${theme} ${rtlClass}`" :dir="rtlClass ? 'rtl' : 'ltr'">
<!--    <app-nav/>-->
    <app-drawer/>
    <main class="row align-stretch hv-100">
      <div class="xcol-info-spaced app-bg-paper">
        <servers-view/>
      </div>
      <div class="xcol-body-spaced column p-custom">
        <div class="m-auto">
          <div class="row-c mt-2">
            <active-button :is-active="active" @click="activate" :loading="loading"/>
          </div>
          <div class="app-text-secondary text-small f-center m-1-0">
            بعد از فعال یا غیر فعال کردن، می‌توانید برنامه را کامل ببندید.
          </div>
        </div>
        <div class="row app-bg-paper round-10">
          <div class="xcol-2-2">
            <span class="text-small app-text-secondary">سرور</span>
            <div v-if="selectedServer" class="p-1 row-a gap">
              <img :src="selectedServer.image" class="dns-logo" alt="shecan">
              <p>{{ selectedServer.title }}</p>
            </div>
          </div>
          <div class="xcol-2-2">
            <span class="text-small app-text-secondary">DNS</span>
            <div v-if="selectedServer" class=" p-1 row-a gap ">
              <p class="">
                {{ selectedServer.dns1 }} - {{ selectedServer?.dns2 }}
              </p>
            </div>
          </div>
          <div class="xcol-2-2">
            <label>
              <span class="text-small app-text-secondary">نوع آداپتور</span>
              <select class="app-bg-paper round-10 p-1 w-100 borderless" v-model="adapter">
                <option v-for="adapter in adapters" :value="adapter">{{adapter}}</option>
              </select>
            </label>
          </div>
          <div class="xcol-2-2">
            <span class="text-small app-text-secondary">IPV6</span>
            <label class="row-a gap text-small">
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
import {computed, onBeforeMount, onMounted, ref} from "vue";
import ActiveButton from "@/render/components/ActiveButton.vue";
import useServersStore from "@/render/store/ServersStore";
import {EVENTS_KEYS} from "@/electron/utils/EVENTS_KEYS";
import ServersView from "@/render/views/ServersView.vue";
import IconifyIcon from "@/render/components/app/IconifyIcon.vue";

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

onMounted(async () => {
  serversStore.getServers();
  checkCurrentDns()
  getAdaptersList()
})
</script>
<style lang="scss" scoped>
main{
  min-height: calc(700px - 70px - 60px - 20px);
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
}
</style>

import {ref} from 'vue'
import {defineStore} from 'pinia'
import type {ServerModel} from "@/models/ServerModel";
import {serversList} from "@/utils/data/ServersList";

const useServersStore = defineStore('server', () => {
  const loading = ref(false)
  const error = ref<any>()

  const servers = ref<ServerModel[]>([])

  const getServers = () => {
    servers.value = serversList
  }

  const selectedServer = ref<ServerModel|undefined>(serversList[0])

  const selectServer = (id:number) => {
    selectedServer.value = servers.value.find(_server => _server.id === id)
  }

  return {
    loading, error,
    getServers, servers,selectedServer,selectServer
  }
})
export default useServersStore
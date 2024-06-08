import {ref} from 'vue'
import {defineStore} from 'pinia'
import AppConfig from "@/render/config";
import useStorage from "@/render/services/useStorage";
import STORAGE_KEYS from "@/render/utils/constansts/STORAGE_KEYS";

const useAppStore = defineStore('app', () => {
  const loading = ref(false)
  const error = ref<any>()

  const theme = ref<string>(useStorage.get(STORAGE_KEYS.THEME) ?? AppConfig.theme.default)
  const toggleTheme = (newTheme:string) => {
    theme.value = newTheme
    useStorage.set(STORAGE_KEYS.THEME, theme.value)
  }

  const showDrawer = ref(false)
  const toggleDrawer = (state:boolean) => {
    showDrawer.value = state
  }

  const profileDrawer = ref(false)
  const toggleProfileDrawer = (state:boolean) => {
    profileDrawer.value = state
  }

  return {
    loading, error, theme, showDrawer, profileDrawer,
    toggleTheme, toggleDrawer, toggleProfileDrawer
  }
})
export default useAppStore
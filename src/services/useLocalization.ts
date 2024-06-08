import localization from "@/localization"
import {nextTick} from "vue"
import type {NavigationGuardNext, RouteLocationNormalized} from "vue-router";
import AppConfig from "@/config";
import useStorage from "./useStorage";
import STORAGE_KEYS from "@/utils/constansts/STORAGE_KEYS";

const useLocalization = {
    set currentLocale(newLocale: any) {
        localization.global.locale.value = newLocale
    },
    get supportedLocales(): string[] {
        return AppConfig.localization.supported.split(",")
    },
    get defaultLocale(): string {
        return AppConfig.localization.default
    },
    async switchLanguage(newLocale: string): Promise<void> {
        await useLocalization.loadLocaleMessages(newLocale)
        useLocalization.currentLocale = newLocale
        document.querySelector("html")?.setAttribute("lang", newLocale)
        useStorage.set(STORAGE_KEYS.LOCALIZATION, newLocale)
    },
    isLocaleSupported(locale: string): boolean {
        return useLocalization.supportedLocales.includes(locale)
    },
    getUserLocale() {
        // const locale = window.navigator.language ||
        //     Trans.defaultLocale
        const locale = useLocalization.defaultLocale
        return {
            locale: locale,
            localeNoRegion: locale.split('-')[0]
        }
    },

    getPersistedLocale() {
        const persistedLocale = useStorage.get<string>(STORAGE_KEYS.LOCALIZATION)
        if (useLocalization.isLocaleSupported(persistedLocale)) {
            return persistedLocale
        } else {
            return null
        }
    },
    guessDefaultLocale() {
        const userPersistedLocale = useLocalization.getPersistedLocale()
        if (userPersistedLocale) {
            return userPersistedLocale
        }
        const userPreferredLocale = useLocalization.getUserLocale()
        if (useLocalization.isLocaleSupported(userPreferredLocale.locale)) {
            return userPreferredLocale.locale
        }
        if (useLocalization.isLocaleSupported(userPreferredLocale.localeNoRegion)) {
            return userPreferredLocale.localeNoRegion
        }

        return useLocalization.defaultLocale
    },
    async routeMiddleware(to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) {
        const paramLocale = to.params.locale?.toString()
        if (!useLocalization.isLocaleSupported(paramLocale)) {
            return next(useLocalization.guessDefaultLocale())
        }
        await useLocalization.switchLanguage(paramLocale)
        return next()
    },
    get currentLocale() {
        return localization.global.locale.value
    },
    i18nRoute(to: any) {
        return {
            ...to,
            params: {
                locale: useLocalization.currentLocale,
                ...to.params
            }
        }
    },
    async loadLocaleMessages(locale: any) {
        if (!localization.global.availableLocales.includes(locale)) {
            const messages = await import(`../localization/locales/${locale}.json`)
            // const messages = await this.getLocaleFromApi(locale)
            localization.global.setLocaleMessage(locale, messages.default)
        }

        return nextTick()
    },
    // async getLocaleFromApi(locale){
    //     return await axios.get(`${AppConfig.appUrl}/locales/${locale}.json`)
    //         .then(res => res.data)
    //         .catch(() => {})
    // }
}

export default useLocalization
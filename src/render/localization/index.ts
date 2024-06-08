import {createI18n} from "vue-i18n";
import fa from "./locales/fa.json"
import AppConfig from "@/render/config";

const localization = createI18n({
    allowComposition: true,
    locale: AppConfig.localization.default,
    fallbackLocale: AppConfig.localization.fallback,
    globalInjection: true,
    legacy: false,
    messages:{fa}
})
export default localization
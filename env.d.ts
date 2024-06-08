/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_DEBUG: string,

    readonly VITE_LOCALIZATION_DEFAULT: string,
    readonly VITE_LOCALIZATION_FALLBACK: string,
    readonly VITE_LOCALIZATION_SUPPORTED: string,

    readonly VITE_THEME_DEFAULT: string,
    readonly VITE_THEME_SUPPORTED: string,

}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
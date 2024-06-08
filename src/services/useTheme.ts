import AppConfig from '@/config'
import localization from '@/localization'
const {t} = localization.global

export const useTheme = () => {
    const supportedThemes:string[] = AppConfig.theme.supported?.split(',')

    const themes = supportedThemes?.map(theme => {
        return {
            title: t(`themes.${theme}`,),
            value: theme,
        }
    })

    return {
        themes
    }
}
import type BreadcrumbProps from "@/render/types/BreadcrumbProps";
import localization from "@/render/localization";

const {t} = localization.global
const ArticlesBreadcrumbUtils: BreadcrumbProps[] = [
    {
        title: t('navigation.home'),
        to: {name: 'home'}
    },
    {
        title: t('navigation.articles'),
    },
]
export default ArticlesBreadcrumbUtils
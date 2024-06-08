import type BreadcrumbProps from "@/types/BreadcrumbProps";
import localization from "@/localization";

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
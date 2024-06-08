import type CurrencyOptionsType from "@/render/types/services/CurrencyOptionsType";
import CURRENCY_SINGS from "@/render/utils/constansts/CurrencySignsUtils";

const defaultOptions: CurrencyOptionsType = {
    isRial: false,
    locale: 'fa-IR',
    hasSign: false,
    sign: CURRENCY_SINGS.TOOMAN
}
const useCurrency = (price: string|number, options: CurrencyOptionsType = defaultOptions): string|number  => {
    if (options.isRial){ price = +price / 10 }

    let result:string|number = new Intl.NumberFormat(options.locale).format(+price)

    result = `${result} ${options.hasSign ? options.sign : '' }`

    return result
}

export default useCurrency
export {CURRENCY_SINGS}
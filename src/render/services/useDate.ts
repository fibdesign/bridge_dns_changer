import type DateOptionsType from "@/render/types/services/DateOptionsType";

const defaultOptions:DateOptionsType = {
    time: false,
    week: false,
    date: true,
    locale: 'fa-IR'
}
const useDate = (date:Date|string, options:DateOptionsType = defaultOptions) => {
    const config:Intl.DateTimeFormatOptions = {}

    if (options.date) {
        config.year = 'numeric';
        config.month = '2-digit';
        config.day = '2-digit';
    }

    if (options.time) {
        config.hour = '2-digit';
        config.minute = '2-digit';
        config.second = '2-digit';
    }

    if (options.week) {
        config.weekday = 'long';
    }

    return new Date(date).toLocaleDateString(options.locale ?? 'fa-IR',config)
}

export default useDate
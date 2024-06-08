export enum INVOICE_STATUS {
    ORDERED,
    PROCESSING,
    SHIPPED,
    DELIVERED,
}
export enum INVOICE_STATUS_TITLE {
     'ثبت شده',
     'در حال پردازش',
     'در حال ارسال',
     'دریافت شده',
}
export const INVOICE_STATUS_OBJ = [
    {
        status: INVOICE_STATUS.ORDERED,
        title: INVOICE_STATUS_TITLE[INVOICE_STATUS.ORDERED],
        description: 'سفارش شما ثبت شده‌ و در انتظار پرداخت می‌باشد.'
    },
    {
        status: INVOICE_STATUS.PROCESSING,
        title: INVOICE_STATUS_TITLE[INVOICE_STATUS.PROCESSING],
        description: 'سفارش شما تأیید شده است. در حال آماده سازی سفارش شما هستیم.'
    },
    {
        status: INVOICE_STATUS.SHIPPED,
        title: INVOICE_STATUS_TITLE[INVOICE_STATUS.SHIPPED],
        description: 'سفارش شما در حال ارسال توسط پیک می‌باشد.'
    },
    {
        status: INVOICE_STATUS.DELIVERED,
        title: INVOICE_STATUS_TITLE[INVOICE_STATUS.DELIVERED],
        description: 'سفارش دریافت شده است.'
    },
]
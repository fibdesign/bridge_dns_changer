const AppConfig = {
    app:{
        debug: true,
    },
    url: {
        base: '/',
        api: 'http://localhost:8000',
        app: 'http://localhost:5173',
        paymentResult: 'http://localhost:5173/fa/payment-result',
    },
    localization: {
        default: 'fa',
        fallback: 'fa',
        supported: 'fa,dark'
    },
    theme:{
        default: 'dark',
        supported: 'light,dark',
    },
}

export default AppConfig
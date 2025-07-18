import {app, shell} from "electron";

export const menuItems:(Electron.MenuItemConstructorOptions | Electron.MenuItem)[] = [
    {
        label: 'فایل',
        submenu: [
            { label: 'بارگذاری مجدد برنامه', click: () => {
                    app.relaunch()
                    app.exit()
                } },
            { type: 'separator' },
            {label:'خروج', role: 'quit' }
        ]
    },
    {
        label: 'نمایش',
        submenu: [
            {label: 'تمام صفحه', role: 'togglefullscreen' },
            {role: 'toggleDevTools' }
        ]
    },
    {
        label: 'پشتیبانی',
        submenu: [
            { label: 'وب سایت', click: () => shell.openExternal('https://bridge.fibdesign.ir')},
            { label: 'محصولات دیگر', click: () => shell.openExternal('https://fibdesign.ir')},
            { label: 'ارتباط با ما', click: () => shell.openExternal('https://fibdesign.ir/fa/contact-us')},
            {type: 'separator'},
            { label: 'درباره ما' },
        ]
    },
    {
        label: 'حمایت مالی',
        click: () => shell.openExternal('https://bridge.fibdesign.ir')
    },
]
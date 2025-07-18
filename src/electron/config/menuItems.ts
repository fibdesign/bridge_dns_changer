import {app, shell} from "electron";
import {autoUpdater} from "electron-updater";

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
            {
                label: 'کانال تلگرام',
                click: () => {
                    const telegramDesktopURL = 'tg://resolve?domain=bridge_dns';
                    const telegramWebURL = 'https://t.me/bridge_dns';

                    shell.openExternal(telegramDesktopURL).catch(() => {
                        // Fallback to web if desktop app not available
                        shell.openExternal(telegramWebURL);
                    });
                }
            },
            {
                label: 'درباره ما',
                click: (menuItem, browserWindow) => {
                    if (browserWindow) {
                        browserWindow.webContents.send('open-about-modal');
                    }
                }
            },
            {type: 'separator'},
            {
                label: 'بررسی بروزرسانی',
                click: () => {
                    autoUpdater.checkForUpdates();
                }
            }
        ]
    },
    {
        label: 'حمایت مالی',
        click: () => shell.openExternal('https://bridge.fibdesign.ir')
    },
]
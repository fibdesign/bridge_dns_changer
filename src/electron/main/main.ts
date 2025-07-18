import {join} from 'path';
import {app, BrowserWindow, ipcMain, Menu, dialog} from 'electron';
import { autoUpdater } from 'electron-updater';
import {EVENTS_KEYS} from "../utils/EVENTS_KEYS";
import config, {IS_DEV} from '../config';
import {openLinkEvent} from "../events/openLinkEvent";
import {clearDnsEvent} from "../events/clearDnsEvent";
import {changeDnsEvent} from "../events/changeDnsEvent";
import {checkDnsEvent} from "../events/checkDnsEvent";
import {getAdaptersEvent} from "../events/getAdaptersEvent";
import {getActiveAdaptor} from "../events/getActiveAdaptor";
import {toggleIPv6Event} from "../events/toggleIPV6Event";
import {getIPV6StatusEvent} from "../events/getIPV6StatusEvent";
import {checkAppUpdateEvent} from "../events/checkAppUpdateEvent";
import {menuItems} from "../config/menuItems";

const isDev = process.env.npm_lifecycle_event === "app:dev";
let mainWindow: BrowserWindow | undefined;

function createWindow() {
    mainWindow = new BrowserWindow(config.window);

    const menu = Menu.buildFromTemplate(menuItems);

    Menu.setApplicationMenu(menu);

    if (isDev) {
        mainWindow.loadURL(`http://localhost:${config.port}`);
    } else {
        mainWindow.loadFile(join(__dirname, '../../../index.html'));
    }
    if (IS_DEV) mainWindow.webContents.openDevTools();
}

function initAutoUpdater() {
    if (isDev) return;
    autoUpdater.removeAllListeners();
    autoUpdater.autoDownload = false;

    autoUpdater.setFeedURL({
        provider: 'generic',
        url: 'https://dl.bridge.fibdesign.ir'
    });
    autoUpdater.checkForUpdates();

    autoUpdater.on('update-available', async (info) => {
        const {response} = await dialog.showMessageBox({
            type: 'info',
            title: 'بروزرسانی در دسترس است',
            message: `نسخه جدید (${info.version}) آماده دانلود است. آیا مایلید همین حالا بروزرسانی را دانلود کنید؟`,
            buttons: ['بله، دانلود کن', 'خیر'],
            cancelId: 1,
        });
        if (response == 0) {
            autoUpdater.autoDownload = true;
            autoUpdater.downloadUpdate()
                .then(() => {
                    autoUpdater.autoDownload = false;
                })
                .catch(err => {
                dialog.showErrorBox('خطای دانلود', 'دانلود بروزرسانی با شکست مواجه شد: ' + err.message);
            });
        }else{

        }
    });

    autoUpdater.on('update-downloaded', async () => {
        const {response} = await dialog.showMessageBox({
            type: 'info',
            buttons: ['نصب و راه‌اندازی مجدد', 'بعداً'],
            cancelId: 1,
            title: 'بروزرسانی آماده نصب است',
            message: 'دانلود نسخه جدید تکمیل شد. آیا مایلید همین حالا برنامه بروزرسانی و راه‌اندازی شود؟'
        })
        if (response == 0) autoUpdater.quitAndInstall();
    });

    if (mainWindow){
        autoUpdater.on('download-progress', (progressObj) => {
            if (mainWindow) {
                mainWindow.setProgressBar(progressObj.percent / 100); // Windows & macOS taskbar
            }
        });
    }

    autoUpdater.on('error', (err) => {
        dialog.showErrorBox('Update Error', err == null ? 'unknown' : (err.stack || err).toString());
    });
}

app.whenReady().then(() => {
    ipcMain.on(EVENTS_KEYS.CLEAR_DNS, clearDnsEvent);
    ipcMain.on(EVENTS_KEYS.OPEN_LINK, openLinkEvent);
    ipcMain.handle(EVENTS_KEYS.CHANGE_DNS, changeDnsEvent);
    ipcMain.handle(EVENTS_KEYS.CHECK_DNS, checkDnsEvent);
    ipcMain.handle(EVENTS_KEYS.GET_ADAPTERS, getAdaptersEvent);
    ipcMain.handle(EVENTS_KEYS.GET_ACTIVE_ADAPTER, getActiveAdaptor);
    ipcMain.handle(EVENTS_KEYS.TOGGLE_IPV6, toggleIPv6Event);
    ipcMain.handle(EVENTS_KEYS.GET_IPV6_STATUS, getIPV6StatusEvent);
    ipcMain.handle(EVENTS_KEYS.CHECK_APP_UPDATE, checkAppUpdateEvent);

    createWindow();
    initAutoUpdater();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

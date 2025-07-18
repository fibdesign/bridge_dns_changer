import {join} from 'path';
import {app, BrowserWindow, ipcMain, Menu} from 'electron';
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
import {menuItems} from "../config/menuItems";

const isDev = process.env.npm_lifecycle_event === "app:dev";

function createWindow() {
    const mainWindow = new BrowserWindow(config.window);

    const menu = Menu.buildFromTemplate(menuItems);

    Menu.setApplicationMenu(menu);

    if (isDev) {
        mainWindow.loadURL(`http://localhost:${config.port}`);
    } else {
        mainWindow.loadFile(join(__dirname, '../../../index.html'));
    }
    if (IS_DEV) mainWindow.webContents.openDevTools();
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
    createWindow()
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

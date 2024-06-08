import {join} from 'path';
import {app, BrowserWindow, dialog, ipcMain, shell} from 'electron';
import {exec} from 'child_process';
import {EVENTS_KEYS} from "../utils/EVENTS_KEYS";
import config from '../config';
import {openLinkEvent} from "../events/openLinkEvent";
import {clearDnsEvent} from "../events/clearDnsEvent";
import {changeDnsEvent} from "../events/changeDnsEvent";

const isDev = process.env.npm_lifecycle_event === "app:dev";

function createWindow() {
    const mainWindow = new BrowserWindow(config.window);
    mainWindow.setMenu(null)

    if (isDev) {
        mainWindow.loadURL(`http://localhost:${config.port}`);
    } else {
        mainWindow.loadFile(join(__dirname, '../../../index.html'));
    }
    // mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
    ipcMain.on(EVENTS_KEYS.CHANGE_DNS,changeDnsEvent);
    ipcMain.on(EVENTS_KEYS.CLEAR_DNS, clearDnsEvent);
    ipcMain.on(EVENTS_KEYS.OPEN_LINK, openLinkEvent);
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

import {shell} from "electron";
import IpcMainEvent = Electron.IpcMainEvent;

export const openLinkEvent = (_event:IpcMainEvent, url: string) => {
    shell.openExternal(url)
}